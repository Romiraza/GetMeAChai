"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { updateProfile, fetchuser } from "@/actions/useraction"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Dashboard = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilePic: "",
    coverPic: "",
    safepayid: "",
    safepaysecret: "",
  })

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.push("/login")
      return
    }

    if (status === "authenticated" && session?.user?.name) {
      getData()
    }
  }, [status, session?.user?.name])

  const getData = async () => {
    const u = await fetchuser(session.user.name)
    if (u) setForm(u)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    await updateProfile(e, session.user.name)

    toast.success("Profile Updated Successfully", {
      toastId: "profile-update",
      theme: "dark",
    })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        theme="dark"
      />

      <main className="w-full px-4 py-6 text-white sm:px-6 sm:py-8 md:py-10">

        {/* Page Heading */}
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8">
          <h1 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
            Welcome To The Dashboard!
          </h1>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Manage your profile and payment details.
          </p>
        </div>

        {/* Dashboard Form */}
        <form
          action={handleSubmit}
          className="mx-auto w-full max-w-2xl rounded-xl border border-white/10 bg-gray-900/60 p-4 shadow-xl shadow-purple-950/10 sm:p-6 md:p-8"
        >

          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium sm:text-base"
            >
              Name
            </label>

            <input
              type="text"
              value={form.name || ""}
              onChange={handleChange}
              name="name"
              id="name"
              placeholder="Enter your name"
              className="block w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 sm:text-base"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium sm:text-base"
            >
              Email
            </label>

            <input
              type="email"
              value={form.email || ""}
              onChange={handleChange}
              name="email"
              id="email"
              placeholder="Enter your email"
              className="block w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 sm:text-base"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium sm:text-base"
            >
              Username
            </label>

            <input
              type="text"
              value={form.username || ""}
              onChange={handleChange}
              name="username"
              id="username"
              placeholder="Enter your username"
              className="block w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 sm:text-base"
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-4">
            <label
              htmlFor="profilePic"
              className="mb-2 block text-sm font-medium sm:text-base"
            >
              Profile Picture URL
            </label>

            <input
              type="text"
              value={form.profilePic || ""}
              onChange={handleChange}
              name="profilePic"
              id="profilePic"
              placeholder="Enter profile picture URL"
              className="block w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 sm:text-base"
            />
          </div>

          {/* Cover Picture */}
          <div className="mb-4">
            <label
              htmlFor="coverPic"
              className="mb-2 block text-sm font-medium sm:text-base"
            >
              Cover Picture URL
            </label>

            <input
              type="text"
              value={form.coverPic || ""}
              onChange={handleChange}
              name="coverPic"
              id="coverPic"
              placeholder="Enter cover picture URL"
              className="block w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 sm:text-base"
            />
          </div>

          {/* Safepay ID */}
          <div className="mb-4">
            <label
              htmlFor="safepayid"
              className="mb-2 block text-sm font-medium sm:text-base"
            >
              Safepay ID
            </label>

            <input
              type="password"
              value={form.safepayid || ""}
              onChange={handleChange}
              name="safepayid"
              id="safepayid"
              placeholder="Enter Safepay public key"
              autoComplete="off"
              className="block w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 sm:text-base"
            />
          </div>

          {/* Safepay Secret */}
          <div className="mb-5">
            <label
              htmlFor="safepaysecret"
              className="mb-2 block text-sm font-medium sm:text-base"
            >
              Safepay Secret
            </label>

            <input
              type="password"
              value={form.safepaysecret || ""}
              onChange={handleChange}
              name="safepaysecret"
              id="safepaysecret"
              placeholder="Enter Safepay secret key"
              autoComplete="new-password"
              className="block w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 sm:text-base"
            />
          </div>

          {/* Save Button */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-linear-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-blue-500 hover:to-purple-500 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 sm:py-3 sm:text-base"
            >
              Save Changes
            </button>
          </div>

        </form>
      </main>
    </>
  )
}

export default Dashboard