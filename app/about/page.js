import Link from "next/link"

export const metadata = {
  title: "About - Get Me A Chai",
  description:
    "Get Me A Chai lets fans support the creators they follow with a small payment and a message.",
}

const steps = [
  {
    title: "Create your page",
    body: "Sign in with GitHub, then add your name, profile picture and cover picture from the dashboard.",
  },
  {
    title: "Send a chai",
    body: "Pick a quick amount or enter your own, write a message, and pay through Safepay.",
  },
  {
    title: "Show up on the page",
    body: "Once Safepay confirms the payment, the supporter's name, amount and message appear on the creator's page.",
  },
]

const stack = ["Next.js", "NextAuth", "MongoDB", "Safepay"]

const css = `
@keyframes about-steam {
  0% { opacity: 0; transform: translateY(8px); }
  40% { opacity: .9; }
  100% { opacity: 0; transform: translateY(-14px); }
}
.about-steam { animation: about-steam 3.2s ease-in-out infinite; transform-box: fill-box; }
.about-steam-2 { animation-delay: .8s; }
.about-steam-3 { animation-delay: 1.6s; }
@media (prefers-reduced-motion: reduce) {
  .about-steam { animation: none; opacity: .6; }
}
`

const Cup = () => (
  <svg
    viewBox="0 0 240 240"
    role="img"
    aria-label="A steaming cup of chai"
    className="h-auto w-56 sm:w-72"
  >
    <defs>
      <linearGradient id="cupFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#9333ea" />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
    </defs>

    <g fill="none" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round">
      <path className="about-steam about-steam-1" d="M95 70 C85 55, 105 45, 95 30" />
      <path className="about-steam about-steam-2" d="M120 75 C110 55, 130 42, 120 22" />
      <path className="about-steam about-steam-3" d="M145 70 C135 55, 155 45, 145 30" />
    </g>

    <ellipse cx="120" cy="206" rx="86" ry="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
    <path
      d="M186 110 h14 a22 22 0 0 1 0 44 h-24"
      fill="none"
      stroke="url(#cupFill)"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <path d="M52 92 h136 v44 a68 68 0 0 1 -68 68 a68 68 0 0 1 -68 -68 z" fill="url(#cupFill)" />
    <ellipse cx="120" cy="92" rx="68" ry="9" fill="#1e1b4b" />
  </svg>
)

const about = () => {
  return (
    <main className="text-white">
      <style>{css}</style>

      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-10 px-6 py-16 md:flex-row md:py-24">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            A cup of chai is the easiest way to say thanks.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-400">
            Get Me A Chai lets fans support the creators they follow with a small payment of any
            amount, plus a message to go with it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link
              href="/login"
              className="rounded-lg bg-linear-to-br from-purple-600 to-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-linear-to-bl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Start your page
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
            >
              Back to home
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-center">
          <Cup />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-bold">How it works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-lg bg-slate-900 p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-linear-to-br from-purple-600 to-blue-500 text-sm font-bold">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-slate-400">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Two sides */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="w-full rounded-lg bg-slate-900 p-6 md:w-1/2">
            <h2 className="text-2xl font-bold">For creators</h2>
            <p className="mt-3 text-slate-400">
              Your page lives at <span className="text-purple-400">/your-username</span>. Share the
              link and every supporter shows up on it, with the message they left.
            </p>
          </div>
          <div className="w-full rounded-lg bg-slate-900 p-6 md:w-1/2">
            <h2 className="text-2xl font-bold">For supporters</h2>
            <p className="mt-3 text-slate-400">
              Choose an amount, write a short message and pay securely through Safepay. You land
              back on the creator's page when the payment is confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-12">
        <h2 className="text-2xl font-bold">Built with</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {stack.map((t) => (
            <li
              key={t}
              className="rounded-full border border-slate-700 bg-slate-900 px-4 py-1.5 text-sm text-slate-300"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default about

