import { NextResponse } from "next/server"
import safepayCore from "@sfpy/node-core"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"

const isProd = process.env.SAFEPAY_ENV === "production"

const safepay = safepayCore(process.env.SAFEPAY_V1_SECRET, {
  authType: "secret",
  host: isProd
    ? "https://api.getsafepay.com"
    : "https://sandbox.api.getsafepay.com",
})

// 303 se POST ke baad bhi browser GET se page kholta hai
const goTo = (path) =>
  NextResponse.redirect(new URL(path, process.env.NEXT_PUBLIC_URL), 303)

const PAID_STATES = ["TRACKER_ENDED", "PAID"]

// Response ki alag alag shaklon mein se state dhoondo
const getState = (res) =>
  res?.data?.tracker?.state ??
  res?.data?.state ??
  res?.data?.data?.tracker?.state ??
  res?.data?.data?.state ??
  res?.tracker?.state ??
  res?.state

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function finish(tracker) {

  if (!tracker) return goTo("/")

  await connectDb()

  const payment = await Payment.findOne({ oid: tracker })
  if (!payment) return goTo("/?payment=notfound")

  if (payment.done) return goTo(`/${payment.to_user}?payment=success`)

  // State thora late update ho sakti hai, isliye 4 baar tak check karo
  let state
  for (let i = 0; i < 4; i++) {
    try {
      const res = await safepay.reporter.payments.fetch(tracker)
      console.dir(res, { depth: 4 })
      state = getState(res)
    } catch (err) {
      console.error("Tracker fetch error:", err?.message || err)
    }

    if (PAID_STATES.includes(state)) break
    await sleep(1500)
  }


  if (PAID_STATES.includes(state)) {
    await Payment.findOneAndUpdate({ oid: tracker }, { done: true })
    return goTo(`/${payment.to_user}?payment=success`)
  }

  return goTo(`/${payment.to_user}?payment=pending`)
}

export async function GET(request) {
  const tracker = new URL(request.url).searchParams.get("tracker")
  return finish(tracker)
}

export async function POST(request) {
  let tracker = null
  try {
    const form = await request.formData()
    tracker = form.get("tracker")
  } catch (err) {}
  return finish(tracker)
}