"use client"
import { react, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function URLShortner() {

  const { data: session } = useSession()

  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");

  const handleUrlChange = async (e) => {
    const inputValue = e.target.value;
    setUrl(inputValue);
  }

  const handleShortUrlChange = async (e) => {
    const inputValue = e.target.value;
    setShortUrl(inputValue);
  }

  const CopyToClipboard = async () => {
    if (generated) {
      await navigator.clipboard.writeText(generated);
      toast.success("Link Copied!");

    } else {
      toast.error("Nothing To Copy !");
    }
  }

  const HandleDelete = async () => {
    setGenerated("");
    if (!generated) {
      toast.error("Nothing To Delete !");
    }
  }

  const HandleVisit = () => {
    window.open(generated, "_blank");
  };


  const generate = async () => {

    if (url === "" || shortUrl === "") {
      toast.error("Please enter a URL")
      return
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shortUrl": shortUrl,
      "user": session.user.email
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setGenerated(`${process.env.NEXT_PUBLIC_URL}/${shortUrl}`);
          setUrl("");
          setShortUrl("");
          console.log(result);
          toast.success("Link Generated Successfully!");
        } else {
          toast.error(result.message);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      <main className="min-h-screen bg-[#030712] text-white overflow-hidden">

        {/* Background Glow */}
        <div className="absolute -top-32 left-0 h-[400px] w-[400px] rounded-full bg-violet-700/20 blur-[150px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/20 blur-[150px]" />

        <section className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-32">

          <div className="w-full max-w-4xl rounded-[35px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

            {/* Heading */}

            <div className="text-center">

              <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
                URL SHORTENER
              </span>

              <h1 className="mt-6 text-5xl font-black">
                Shorten Your URL
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-gray-400">
                Paste your long URL below and generate a clean,
                shareable short link in seconds.
              </p>

            </div>

            {/* Form */}

            <div className="mt-14 space-y-8">

              {/* Long URL */}

              <div>

                <label className="mb-3 block text-gray-300">
                  Long URL
                </label>

                <input
                  onChange={handleUrlChange}
                  value={url}
                  type="text"
                  placeholder="https://example.com/very-long-url"
                  className="w-full rounded-2xl border border-white/10 bg-[#111827] px-6 py-4 text-white outline-none transition focus:border-violet-500"
                />

              </div>

              {/* Custom Alias */}

              <div>

                <label className="mb-3 block text-gray-300">
                  Custom Alias (Optional)
                </label>

                <input
                  onChange={handleShortUrlChange}
                  value={shortUrl}
                  type="text"
                  placeholder="my-link"
                  className="w-full rounded-2xl border border-white/10 bg-[#111827] px-6 py-4 text-white outline-none transition focus:border-violet-500"
                />

              </div>

              {/* Generate Button */}

              <button
                onClick={generate}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 text-lg font-semibold transition hover:scale-[1.02]">
                Generate Short Link
              </button>

            </div>

            {/* Output Preview */}

            <div className="mt-12 rounded-3xl border border-green-500/20 bg-green-500/10 p-8">

              <p className="text-sm text-green-400">
                Your Short URL
              </p>

              <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                {generated ? (<h2
                  onClick={HandleVisit}
                  className="text-xl font-semibold text-white break-all hover:underline cursor-pointer">
                  {generated}
                </h2>) :
                  (<h2
                    className="md:text-xl text-sm font-semibold text-white break-all">
                    linksnap.vercel.app/my-link
                </h2>)} 
              
                <div className="flex gap-4">

                  <button
                    onClick={CopyToClipboard}
                    className="rounded-xl cursor-pointer bg-cyan-600 px-3 py-2 text-sm md:px-6 md:py-3 md:font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-cyan-700 hover:shadow-cyan-500/30">
                    Copy
                  </button>

                  <button
                    onClick={HandleDelete}
                    className="rounded-xl cursor-pointer bg-red-600 px-3 py-2 text-sm md:px-6 md:py-3 md:font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main >
    </>
  );
}
