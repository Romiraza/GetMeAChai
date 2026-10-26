"use server"

import safepayCore from "@sfpy/node-core"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"


const isProd = process.env.SAFEPAY_ENV === "production"
const env = isProd ? "production" : "sandbox"

const safepay = safepayCore(process.env.SAFEPAY_V1_SECRET, {
  authType: "secret",
  host: isProd
    ? "https://api.getsafepay.com"
    : "https://sandbox.api.getsafepay.com",
})

export const initiate = async (amount, to_username, paymentform) => {
  await connectDb()

  const numericAmount = Number.parseInt(amount)

  // 1. Payment session banao
  const session = await safepay.payments.session.setup({
    merchant_api_key: process.env.SAFEPAY_API_KEY,
    intent: "CYBERSOURCE",
    mode: "payment",
    entry_mode: "raw",
    currency: "PKR",
    amount: numericAmount,
  })
  const tracker = session.data.tracker.token

  // 2. Authentication token (tbt) banao
  const auth = await safepay.client.passport.create()
  const tbt = typeof auth?.data === "string" ? auth.data : auth?.data?.token

  // 3. Database mein pending payment save karo
  await Payment.create({
    oid: tracker,
    amount: numericAmount,
    to_user: to_username,
    name: paymentform.name?.trim() || "Anonymous",
    message: paymentform.message || "",
    done: false,
  })

  // 4. Checkout URL banao
  const url = safepay.checkout.createCheckoutUrl({
    env,
    tracker,
    tbt,
    source: "hosted",
    redirect_url: `${process.env.NEXT_PUBLIC_URL}/api/safepay`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/${to_username}?payment=cancelled`,
  })

  return { tracker, url }
}

export const fetchuser = async (username) => {
  await connectDb()
  const u = await User.findOne({ username }).lean()
  if (!u) return null
  // _id (ObjectId) aur dates ko plain values bana do
  return JSON.parse(JSON.stringify(u))
}

export const fetchpayment = async (username) => {
  await connectDb()
  const p = await Payment.find({ to_user: username, done: true })
    .sort({ amount: -1 })
    .limit(5)
    .lean()
  return JSON.parse(JSON.stringify(p))
}

export const updateProfile = async (data, oldusername) =>{
  await connectDb()
  let ndata = Object.fromEntries(data)

  // if username is being updated, check if new username already exists
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username })
    if (u) {
      return { error: "Username already exists" }
    }
    await User.updateOne({ email: ndata.email }, ndata)
    // Now update all payments in the payment table
    await Payment.updateMany({ to_user: oldusername }, { to_user: ndata.username })
  }else{

    await User.updateOne({email: ndata.email}, ndata)
  }


} 