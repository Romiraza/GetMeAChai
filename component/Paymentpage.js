"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { fetchuser, fetchpayment, initiate } from "@/actions/useraction"

const Paymentpage = ({ username, payment }) => {
  const router = useRouter()

  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  })

  const [currentuser, setcurrentuser] = useState({})
  const [payments, setPayments] = useState([])

  useEffect(() => {
    getData()
  }, [username])

  const handleChange = (e) => {
    setPaymentform({
      ...paymentform,
      [e.target.name]: e.target.value,
    })
  }

  const getData = async () => {
    const u = await fetchuser(username)
    setcurrentuser(u || {})

    const dbPayments = await fetchpayment(username)
    setPayments(dbPayments || [])
  }

  const pay = async (amount) => {
    try {
      if (
        !paymentform.name.trim() ||
        paymentform.name.trim().length < 3 ||
        paymentform.message.trim().length < 4 ||
        !Number.isFinite(amount) ||
        amount <= 0
      ) {
        toast.error("Please enter your name, message and a valid amount.", {
          theme: "dark",
        })
        return
      }

      const a = await initiate(amount, username, paymentform)
      window.location.href = a.url
    } catch (err) {
      console.error("Payment error:", err)

      toast.error("Something went wrong while starting the payment.", {
        theme: "dark",
      })
    }
  }

  useEffect(() => {
    if (payment === "success") {
      toast.success("Successfully Paid, Thank You For Your Support", {
        toastId: "pay-status",
        theme: "dark",
      })
    } else if (payment === "cancelled") {
      toast.warn("Payment Canceled!", {
        toastId: "pay-status",
        theme: "dark",
      })
    } else if (payment === "pending") {
      toast.info("Payment Not Confirmed", {
        toastId: "pay-status",
        theme: "dark",
      })
    }

    if (payment) {
      router.replace(`/${username}`)
    }
  }, [payment, router, username])

  const totalRaised = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  )

  const isFormValid =
    paymentform.name.trim().length >= 3 &&
    paymentform.message.trim().length >= 4 &&
    Number(paymentform.amount) > 0

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="dark"
      />

      <main className="w-full min-w-0 text-white">

        {/* Cover Image */}
        <section className="cover relative w-full">
          <img
            src={currentuser?.coverPic || "/cover.png"}
            className="h-48 w-full object-cover object-top sm:h-64 md:h-80 lg:h-96"
            alt="Profile cover"
          />

          {/* Profile Picture */}
          <div className="absolute -bottom-10 left-1/2 size-24 -translate-x-1/2 overflow-hidden rounded-full border-4 border-gray-900 bg-gray-800 shadow-lg sm:-bottom-12 sm:size-28 md:size-32">
            <img
              src={currentuser?.profilePic || "/avatar.gif"}
              className="size-full rounded-full object-cover"
              alt={`${username}'s profile`}
            />
          </div>
        </section>

        {/* Profile Information */}
        <section className="info flex w-full flex-col items-center gap-2 px-4 pt-12 text-center sm:pt-14 md:pt-16">

          <h1 className="break-all text-xl font-bold sm:text-2xl">
            @{username}
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Let's Help {currentuser?.name || username} Get a Chai!
          </p>

          <p className="text-sm text-slate-400 sm:text-base">
            {payments.length} Supporters{" "}
            <span className="mx-1">·</span>
            ₹{totalRaised.toLocaleString("en-IN")} Raised!
          </p>
        </section>

        {/* Supporters and Payment */}
        <section className="payment mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-5 px-4 py-8 sm:gap-6 sm:px-6 sm:py-10 lg:grid-cols-2 lg:gap-8">

          {/* Supporters Card */}
          <div className="supporters min-w-0 rounded-xl border border-white/5 bg-slate-900 p-4 shadow-lg sm:p-6">

            <h2 className="mb-4 text-xl font-bold sm:text-2xl">
              Top Supporters
            </h2>

            <ul className="space-y-4">
              {payments.length === 0 && (
                <li className="py-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                  No Supporters Yet. Be the first one to support!
                </li>
              )}

              {payments.map((p, index) => (
                <li
                  key={p._id || index}
                  className="flex min-w-0 items-start gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                >
                  <img
                    src="/avatar.gif"
                    alt="Supporter avatar"
                    className="size-9 shrink-0 rounded-full object-cover sm:size-10"
                  />

                  <div className="min-w-0 flex-1 break-words text-sm leading-relaxed sm:text-base">
                    <span className="font-semibold text-purple-400">
                      {p.name}
                    </span>{" "}
                    donated{" "}
                    <span className="font-bold text-green-400">
                      ₹{Number(p.amount || 0).toLocaleString("en-IN")}
                    </span>

                    {p.message && (
                      <>
                        {" "}with a message:{" "}
                        <span className="italic text-slate-300">
                          "{p.message}"
                        </span>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Make Payment Card */}
          <div className="makepayment min-w-0 rounded-xl border border-white/5 bg-slate-900 p-4 shadow-lg sm:p-6">

            <h2 className="mb-4 text-xl font-bold sm:text-2xl">
              Make A Payment
            </h2>

            <div className="flex flex-col gap-3">

              <input
                name="name"
                onChange={handleChange}
                value={paymentform.name}
                type="text"
                autoComplete="name"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-base text-white outline-none placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder="Enter Your Name"
              />

              <textarea
                name="message"
                onChange={handleChange}
                value={paymentform.message}
                rows={3}
                className="w-full min-w-0 resize-y rounded-lg border border-slate-700 bg-slate-800 p-3 text-base text-white outline-none placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder="Enter Your Message"
              />

              <input
                name="amount"
                onChange={handleChange}
                value={paymentform.amount}
                type="number"
                min="1"
                inputMode="decimal"
                className="w-full min-w-0 rounded-lg border border-slate-700 bg-slate-800 p-3 text-base text-white outline-none placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder="Enter Your Amount (₹)"
              />

              <button
                onClick={() => pay(Number(paymentform.amount))}
                type="button"
                disabled={!isFormValid}
                className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-purple-500 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
              >
                Pay Now
              </button>
            </div>

            {/* Quick Payment Options */}
            <div className="mt-6">
              <p className="mb-3 text-sm text-slate-400">
                Or choose an amount
              </p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[10, 20, 40].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() =>
                      setPaymentform((prev) => ({
                        ...prev,
                        amount: String(amount),
                      }))
                    }
                    className={`rounded-lg border px-2 py-2.5 text-sm font-semibold transition-all duration-200 sm:px-3 sm:text-base ${
                      Number(paymentform.amount) === amount
                        ? "border-purple-400 bg-purple-600/20 text-purple-300"
                        : "border-slate-700 bg-slate-800 text-white hover:border-purple-500 hover:bg-slate-700"
                    }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  )
}

export default Paymentpage
