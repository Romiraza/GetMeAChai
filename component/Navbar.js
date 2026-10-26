"use client"

import React, { useState, useRef, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

const gradientBtn =
  "rounded-lg font-semibold text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"

// Profile button and Logout button share the same height on desktop
const desktopHeight = "md:h-9"

const itemClass =
  "flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-200 hover:bg-linear-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:text-white transition-all duration-200 cursor-pointer"

const logoutItemClass =
  "flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 cursor-pointer"

const Navbar = () => {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close the menu on outside click or Escape
  useEffect(() => {
    const onPointerDown = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  const close = () => setOpen(false)

  return (
    <nav className="bg-gray-900 text-white flex justify-between items-center gap-2 px-3 sm:px-4 h-13">

      {/* Logo */}
      <Link className="logo font-bold text-base sm:text-lg flex shrink-0 items-center" href="/">
        <img
          src="/tea.gif"
          alt="Tea"
          width={44}
          className="mb-2 invertImg w-9 sm:w-11"
        />
        <span>GetMeAChai!</span>
      </Link>

      {/* Right Side */}
      {status === "loading" ? (
        <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-800" />
      ) : session ? (
        <div ref={menuRef} className="flex items-center gap-1">

          <div className="relative">
            {/* Menu button: hamburger on mobile, profile pill on desktop */}
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Open menu"
              className={`${gradientBtn} ${desktopHeight} flex items-center justify-center gap-2 px-3 py-2 md:px-4 md:py-0 shadow-lg shadow-purple-500/20`}
            >
              <svg
                className="size-5 md:hidden"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                />
              </svg>

              <span className="hidden md:block max-w-48 lg:max-w-64 truncate">
                Welcome {session.user.email}
              </span>

              <svg
                className={`hidden md:block size-4 shrink-0 transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {open && (
              <div
                className="absolute right-0 top-full z-50 mt-2 w-60 max-w-[calc(100vw-1.5rem)]
                overflow-hidden rounded-xl border border-purple-500/30
                bg-gray-900/95 backdrop-blur-md
                shadow-xl shadow-purple-900/30"
              >
                {/* User Info */}
                <div className="border-b border-white/10 px-4 py-3">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="mt-1 truncate text-sm font-medium text-white">
                    {session.user.email}
                  </p>
                </div>

                {/* Menu */}
                <div className="p-2">
                  <Link href="/dashboard" onClick={close} className={itemClass}>
                    📊 <span>Dashboard</span>
                  </Link>

                  <Link href={`/${session.user.name}`} onClick={close} className={itemClass}>
                    ⚙️ <span>Your Profile</span>
                  </Link>

                  {/* Logout (mobile only, desktop has its own button) */}
                  <button onClick={() => signOut()} className={`${logoutItemClass} md:hidden`}>
                    🚪 <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Logout button (desktop only) */}
          <button
            onClick={() => signOut()}
            className={`${gradientBtn} ${desktopHeight} hidden md:flex items-center justify-center m-1 px-6`}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <Link
            href="/login"
            className={`${gradientBtn} px-4 py-1.5 text-sm sm:px-6 sm:text-base`}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar