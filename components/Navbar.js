"use client";

import Link from "next/link";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import LinkIcon from "@/components/LinkIcon";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const [hamburger, setHamburger] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[96%] max-w-7xl -translate-x-1/2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">

      <div className="flex h-20 w-full min-w-0 items-center justify-between px-3 sm:px-5 md:px-8">

        {/* ================= LOGO ================= */}

        <Link
          href="/"
          className="flex min-w-0 shrink items-center gap-2 md:gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 text-xl font-bold text-white shadow-lg md:h-11 md:w-11">
            <LinkIcon size={22} />
          </div>

          <div className="min-w-0">
            <h1 className="text-lg font-bold text-white md:text-xl">
              Shortify
            </h1>

            <p className="hidden text-xs text-gray-400 sm:block">
              Smart URL Shortener
            </p>
          </div>
        </Link>


        {/* ================= DESKTOP NAVIGATION ================= */}

        <div className="hidden items-center gap-3 lg:flex">

          <Link
            href="/"
            className="rounded-full px-5 py-2 font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            Home
          </Link>

          {session && (
            <Link
              href="/mylinks"
              className="rounded-full px-5 py-2 font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              My Links
            </Link>
          )}

          <Link
            href="/about"
            className="rounded-full px-5 py-2 font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="rounded-full px-5 py-2 font-medium text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            Contact
          </Link>

        </div>


        {/* ================= DESKTOP RIGHT BUTTONS ================= */}

        <div className="hidden items-center gap-4 lg:flex">

          {session ? (

            <div className="flex items-center gap-4">

              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-lg">

                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="h-10 w-10 rounded-full border-2 border-violet-500"
                />

                <div className="leading-tight">

                  <p className="text-sm font-semibold text-white">
                    {session.user.name}
                  </p>

                  <p className="max-w-[180px] truncate text-xs text-gray-400">
                    {session.user.email}
                  </p>

                </div>

              </div>

              <button
                onClick={() => signOut()}
                className="cursor-pointer rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-red-300 transition hover:bg-red-500/20"
              >
                Logout
              </button>

            </div>

          ) : (

            <button
              onClick={() => signIn("google")}
              className="cursor-pointer rounded-full border border-white/20 px-5 py-2 text-white transition hover:bg-white/10"
            >
              Login
            </button>

          )}

          <Link href="/URL-Shortner">

            <button className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-6 py-2 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,.5)] transition hover:scale-105">

              Get Started

              <ArrowRightIcon size={20} />

            </button>

          </Link>

        </div>


        {/* ================= MOBILE NAVIGATION ================= */}

        <div className="flex min-w-0 shrink items-center justify-end lg:hidden">

          {hamburger && (

            <div className="flex min-w-0 items-center">

              {/* Home */}

              <Link
                href="/"
                onClick={() => setHamburger(false)}
                className="whitespace-nowrap rounded-full px-1 py-2 text-[10px] font-medium text-gray-300 transition hover:bg-white/10 hover:text-white sm:px-2 sm:text-xs"
              >
                Home
              </Link>


              {/* My Links - Logged in only */}

              {session && (
                <Link
                  href="/mylinks"
                  onClick={() => setHamburger(false)}
                  className="whitespace-nowrap rounded-full px-1 py-2 text-[10px] font-medium text-gray-300 transition hover:bg-white/10 hover:text-white sm:px-2 sm:text-xs"
                >
                  My Links
                </Link>
              )}


              {/* About */}

              <Link
                href="/about"
                onClick={() => setHamburger(false)}
                className="whitespace-nowrap rounded-full px-1 py-2 text-[10px] font-medium text-gray-300 transition hover:bg-white/10 hover:text-white sm:px-2 sm:text-xs"
              >
                About
              </Link>


              {/* Contact */}

              <Link
                href="/contact"
                onClick={() => setHamburger(false)}
                className="whitespace-nowrap rounded-full px-1 py-2 text-[10px] font-medium text-gray-300 transition hover:bg-white/10 hover:text-white sm:px-2 sm:text-xs"
              >
                Contact
              </Link>


              {/* Login - Logged out only */}

              {!session && (
                <button
                  onClick={() => {
                    setHamburger(false);
                    signIn("google");
                  }}
                  className="whitespace-nowrap rounded-full border border-white/20 px-1.5 py-2 text-[10px] font-medium text-white transition hover:bg-white/10 sm:px-3 sm:text-xs"
                >
                  Login
                </button>
              )}


              {/* Logout - Logged in only */}

              {session && (
                <button
                  onClick={() => {
                    setHamburger(false);
                    signOut();
                  }}
                  className="whitespace-nowrap rounded-full border border-red-500/30 bg-red-500/10 px-1.5 py-2 text-[10px] text-red-300 transition hover:bg-red-500/20 sm:px-3 sm:text-xs"
                >
                  Logout
                </button>
              )}

            </div>

          )}


          {/* Hamburger / Close */}

          <button
            onClick={() => setHamburger(!hamburger)}
            className="ml-1 shrink-0 cursor-pointer px-1 text-2xl leading-none text-white"
          >
            {hamburger ? "✕" : "☰"}
          </button>

        </div>

      </div>

    </nav>
  );
}