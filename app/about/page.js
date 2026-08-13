import Link from "next/link";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* Background Glow */}
      <div className="absolute -left-24 top-0 h-[450px] w-[450px] rounded-full bg-violet-700/20 blur-[170px]" />
      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-cyan-600/20 blur-[170px]" />

      <section className="relative mx-auto max-w-7xl px-6 py-36">

        {/* Hero */}

        <div className="text-center">

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            ABOUT SHORTIFY
          </span>

          <h1 className="mt-7 text-5xl font-black leading-tight md:text-7xl">
            More than just
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              a URL Shortener
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
            Shortify is a modern web application that transforms long,
            difficult-to-share URLs into clean and memorable links.
            Designed with simplicity, speed and a beautiful user
            experience in mind.
          </p>

        </div>

        {/* About Card */}

        <div className="mt-24 rounded-[35px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

          <div className="grid gap-16 lg:grid-cols-2">

            <div>

              <h2 className="text-4xl font-bold">
                Our Mission
              </h2>

              <p className="mt-8 leading-8 text-gray-400">
                We wanted to build a clean and modern URL shortener
                that's simple to use while also providing useful
                features like custom aliases and link analytics.
              </p>

              <p className="mt-6 leading-8 text-gray-400">
                This project was created to practice full-stack web
                development using modern technologies such as Next.js,
                MongoDB and Tailwind CSS.
              </p>

            </div>

            <div className="rounded-3xl bg-[#111827] p-8">

              <h3 className="text-2xl font-semibold">
                Why Choose Shortify?
              </h3>

              <div className="mt-8 space-y-6">

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20 text-2xl">
                    ⚡
                  </div>

                  <div>

                    <h4 className="text-xl font-semibold">
                      Fast
                    </h4>

                    <p className="mt-2 text-gray-400">
                      Generate short links in seconds.
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/20 text-2xl">
                    🔒
                  </div>

                  <div>

                    <h4 className="text-xl font-semibold">
                      Secure
                    </h4>

                    <p className="mt-2 text-gray-400">
                      Safely store all your shortened URLs.
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-fuchsia-500/20 text-2xl">
                    📊
                  </div>

                  <div>

                    <h4 className="text-xl font-semibold">
                      Analytics
                    </h4>

                    <p className="mt-2 text-gray-400">
                      Track clicks and link performance.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Tech Stack */}

        <section className="mt-28">

          <div className="text-center">

            <h2 className="text-4xl font-bold">
              Built With
            </h2>

            <p className="mt-5 text-gray-400">
              Modern technologies powering Shortify.
            </p>

          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "Next.js",
              "React",
              "Tailwind CSS",
              "MongoDB",
              "Node.js",
              "Express",
              "JavaScript",
              "Vercel",
            ].map((item) => (

              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl transition hover:-translate-y-2 hover:border-violet-500/40"
              >
                <h3 className="text-xl font-semibold">
                  {item}
                </h3>
              </div>

            ))}

          </div>

        </section>

        {/* CTA */}

        <section className="mt-32 rounded-[35px] bg-gradient-to-r from-violet-700 via-fuchsia-600 to-cyan-600 p-16 text-center">

          <h2 className="text-5xl font-black">
            Ready to get started?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            Create your first short link in just a few seconds.
          </p>

          <Link
            href="/URL-Shortner"
            className="mt-10 items-center gap-2 inline-flex rounded-full bg-white px-10 py-4 text-md md:text-lg font-bold text-black transition hover:scale-105"
          >
            Start Shortening <ArrowRightIcon size={24} />
          </Link>

        </section>

      </section>

    </main>
  );
}