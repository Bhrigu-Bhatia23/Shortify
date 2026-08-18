"use client"
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [info, setInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })


  const HandleChange = (e) => {
    let value = e.target.value
    let name = e.target.name

    setInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }))
  }


  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const HandleClick = async () => {

    const raw = JSON.stringify({
      name: info.name,
      email: info.email,
      subject: info.subject,
      message: info.message
    })

    const PostRequest = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    }

    if (
      info.name === "" ||
      info.email === "" ||
      info.subject === "" ||
      info.message === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    fetch("/api/contact", PostRequest)

      .then((response) => response.json())
      .then((result) => {
        toast.success("Message sent successfully!")
        setInfo({
          name: "",
          email: "",
          subject: "",
          message: ""
        })
      })
      .catch((error) => console.error(error));
  }


  return (
    <main className="min-h-screen bg-[#030712] text-white overflow-hidden">

      <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-700/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-600/20 blur-[150px]" />

      <section className="relative mx-auto max-w-7xl px-6 py-32">

        <div className="text-center">

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            CONTACT US
          </span>

          <h1 className="mt-6 text-6xl font-black">
            We'd Love to
            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400">
            Have a question, suggestion or feedback?
            Send us a message.
          </p>

        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-2">

          {/* Form */}

          <div className="rounded-[35px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

            <h2
              className="text-3xl font-bold">
              Send Message
            </h2>

            <div className="mt-8 space-y-6">

              <input
                onChange={HandleChange}
                name="name"
                value={info.name}
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border border-white/10 bg-[#111827] px-6 py-4 outline-none focus:border-violet-500"
              />

              <input
                onChange={HandleChange}
                name="email"
                value={info.email}
                type="email"
                placeholder="Email Address"
                className="w-full rounded-2xl border border-white/10 bg-[#111827] px-6 py-4 outline-none focus:border-violet-500"
              />

              <input
                onChange={HandleChange}
                name="subject"
                value={info.subject}
                type="text"
                placeholder="Subject"
                className="w-full rounded-2xl border border-white/10 bg-[#111827] px-6 py-4 outline-none focus:border-violet-500"
              />

              <textarea
                onChange={HandleChange}
                name="message"
                value={info.message}
                rows="6"
                placeholder="Your Message..."
                className="w-full rounded-2xl border border-white/10 bg-[#111827] px-6 py-4 outline-none focus:border-violet-500"
              ></textarea>

              <button
                onClick={() => HandleClick()}
                className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 py-4 text-lg font-semibold hover:opacity-90 transition">
                Send Message
              </button>

            </div>

          </div>

          {/* Contact Info */}

          <div className="rounded-[35px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

            <h2 className="text-3xl font-bold">
              Get in Touch
            </h2>

            <p className="mt-6 text-gray-400 leading-8">
              We'd love to hear your ideas, suggestions or feedback.
              Feel free to reach out using any of the methods below.
            </p>

            <div className="mt-12 space-y-8">

              <div>
                <h3 className="text-xl font-semibold">📧 Email</h3>
                <p className="mt-2 text-gray-400">
                  your@email.com
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">💻 GitHub</h3>
                <p className="mt-2 text-gray-400">
                  github.com/yourusername
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">💼 LinkedIn</h3>
                <p className="mt-2 text-gray-400">
                  linkedin.com/in/yourusername
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold">📍 Location</h3>
                <p className="mt-2 text-gray-400">
                  India
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}