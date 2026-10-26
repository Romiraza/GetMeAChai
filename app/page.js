import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4 py-10 text-center text-white sm:gap-5 sm:py-14">

        <div className="flex flex-wrap items-center justify-center gap-2 text-3xl font-bold sm:text-4xl md:text-5xl">
          <span>Get Me A Chai!</span>
          <img
            className="invertImg h-10 w-10 object-contain sm:h-12 sm:w-12"
            src="/tea.gif"
            alt="Tea"
          />
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
          A Crowdfunding Platform for Creators. Get Funded by Your Community.
        </p>

        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">

          <Link
            href="/login"
            className="rounded-lg bg-linear-to-r from-blue-600 to-purple-600
    px-4 py-2 text-sm font-semibold text-white
    shadow-md shadow-purple-500/10
    transition-all duration-300
    hover:from-blue-500 hover:to-purple-500
    active:scale-95
    sm:px-6 sm:py-2.5 sm:text-base"
          >
            Start Now
          </Link>

          <Link
            href="/about"
            className="rounded-lg border border-purple-400/40
    bg-gray-800/70 px-4 py-2 text-sm font-semibold text-white
    transition-all duration-300
    hover:border-purple-400 hover:bg-gray-700
    active:scale-95
    sm:px-6 sm:py-2.5 sm:text-base"
          >
            Read More
          </Link>

        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-white opacity-10" />

      {/* Features Section */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12 text-white sm:py-16 md:py-20">

        <h2 className="mb-10 text-center text-xl font-bold sm:text-2xl md:mb-12">
          Your Fans Can Buy You a Chai
        </h2>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">

          {/* Feature 1 */}
          <div className="flex flex-col items-center space-y-3 text-center">
            <img
              className="rounded-full bg-slate-600 p-2"
              src="/man.gif"
              alt="Creator"
              width={88}
              height={88}
            />

            <h3 className="font-bold">Fund Yourself</h3>

            <p className="max-w-xs text-sm leading-relaxed text-gray-300 sm:text-base">
              Take control of your creative journey.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center space-y-3 text-center">
            <img
              className="rounded-full bg-slate-600 p-2"
              src="/coin.gif"
              alt="Coins"
              width={88}
              height={88}
            />

            <h3 className="font-bold">Support Your Ideas</h3>

            <p className="max-w-xs text-sm leading-relaxed text-gray-300 sm:text-base">
              Invest in your own creative endeavors.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center space-y-3 text-center sm:col-span-2 lg:col-span-1">
            <img
              className="rounded-full bg-slate-600 p-2"
              src="/group.gif"
              alt="Community of fans"
              width={88}
              height={88}
            />

            <h3 className="font-bold">Fans Want To Help</h3>

            <p className="max-w-xs text-sm leading-relaxed text-gray-300 sm:text-base">
              Fans can support your creative projects.
            </p>
          </div>

        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-white opacity-10" />

      {/* YouTube Video Section */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-12 text-white sm:py-16 md:py-20">

        <h2 className="mb-8 text-center text-xl font-bold sm:mb-10 sm:text-2xl">
          Learn More About Us
        </h2>

        <div className="w-full max-w-3xl overflow-hidden rounded-2xl sm:rounded-3xl">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/iIWd6FbQqtM?si=5PXYqF_DMva6gCxJ"
            title="Learn More About Get Me A Chai"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

      </section>
    </>
  );
}
