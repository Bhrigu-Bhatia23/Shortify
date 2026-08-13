'use client';
import Link from "next/link";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

export default function Home() {
  return (
    <main className="bg-[#030712] text-white overflow-hidden">

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center px-6">

        {/* Background Blur */}
        <div className="absolute -top-40 left-20 h-96 w-96 rounded-full bg-violet-700/30 blur-[150px]" />
        <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-6xl text-center">

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            🚀 Fast • Secure • Free Forever
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight md:text-8xl">
            Short links.
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Bigger Impact.
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
            Create beautiful, trackable short links with powerful analytics.
            Designed for creators, startups and developers.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">

            <Link
              href="/URL-Shortner"
              className="flex items-center text-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-4 text-lg font-semibold transition hover:scale-105"
            >
              Start Shortening 
              <ArrowRightIcon size={22} />
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-8 py-4 text-lg hover:bg-white/10"
            >
              View GitHub
            </a>

          </div>

        </div>

      </section>

      {/* Trusted */}
      {/* ================= WHY LINKSNAP ================= */}

      <section className="mx-auto max-w-7xl px-6 py-28 ">

        <div className="text-center">

          <span className="inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
            WHY CHOOSE LINKSNAP
          </span>

          <h2 className="mt-6 text-4xl font-extrabold md:text-5xl">
            Everything you need to manage
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              your short links
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-400">
            LinkSnap is designed to make URL shortening simple and efficient.
            Create clean links, manage them effortlessly, and share them anywhere
            with confidence.
          </p>

        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          {[
            {
              title: "Lightning Fast",
              desc: "Generate short URLs instantly with a clean and intuitive interface.",
              icon: "⚡",
              color: "hover:border-violet-500/50",
            },
            {
              title: "Analytics",
              desc: "View click statistics and monitor your shortened links with ease.",
              icon: "📊",
              color: "hover:border-cyan-500/50",
            },
            {
              title: "Secure Storage",
              desc: "Your URLs are safely stored in the database and always accessible.",
              icon: "🔒",
              color: "hover:border-fuchsia-500/50",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`group rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${card.color}`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl transition duration-300 group-hover:scale-110">
                {card.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold">
                {card.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-400">
                {card.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Analytics */}
      <section className="mx-auto max-w-6xl px-6 py-24">

        <div className="rounded-[40px] border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-10 backdrop-blur-xl">

          <div className="grid gap-12 md:grid-cols-2">

            <div>

              <h2 className="text-5xl font-bold">
                Powerful Analytics
              </h2>

              <p className="mt-6 text-gray-400">
                Monitor every click with beautiful dashboards, device insights,
                browser analytics and geographic reports.
              </p>

            </div>

            <div className="rounded-3xl bg-[#111827] p-8">

              <div className="mb-6 h-4 w-40 rounded-full bg-violet-500" />

              <div className="space-y-4">
                <div className="h-4 rounded-full bg-gray-700"></div>
                <div className="h-4 w-4/5 rounded-full bg-gray-700"></div>
                <div className="h-4 w-3/5 rounded-full bg-gray-700"></div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-6xl px-6 py-24">

        <h2 className="text-center text-5xl font-bold">
          How it works
        </h2>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          {[
            "Paste your long URL",
            "Generate your short link",
            "Share & track analytics",
          ].map((step, i) => (
            <div
              key={step}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center hover:-translate-y-2 transition hover:border-violet-500/40 duration-300"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-xl font-bold">
                {i + 1}
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {step}
              </h3>
            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-28">

        <div className="rounded-[40px] bg-gradient-to-r from-violet-700 to-cyan-600 p-16 text-center">

          <h2 className="text-5xl font-bold">
            Ready to simplify your links?
          </h2>

          <p className="mt-5 text-lg text-white/80">
            Join thousands of users shortening millions of links every month.
          </p>

          <Link
            href="/URL-Shortner"
            className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-lg font-bold text-black transition hover:scale-105"
          >
            Get Started
          </Link>

        </div>

      </section>

    </main>
  );
}

