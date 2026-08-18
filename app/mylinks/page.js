"use client";

import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { CopyIcon } from "@/components/icons/CopyIcon";
import { SquarePenIcon } from "@/components/icons/SquarePenIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

const Page = () => {
    const [links, setLinks] = useState([]);
    const [search, setsearch] = useState("")

    const handleSearch = (e) => {
        let box = e.target.value
        setsearch(box)
    }

    // EDIT UI
    const [editingLink, setEditingLink] = useState(null);
    const [editShortUrl, setEditShortUrl] = useState("");
    const [editUrl, setEditUrl] = useState("");

    const fetchLinks = async () => {
        const response = await (fetch("/api/links"))
        const data = await response.json();

        if (data.success) {
            setLinks(data.links)
        }
    }

    useEffect(() => {
        fetchLinks();
    }, []);

    // COPY
    const handleCopy = async (link) => {
        const shortLink = `${process.env.NEXT_PUBLIC_URL}/${link.shortUrl}`;

        await navigator.clipboard.writeText(shortLink);

        toast.success("Copied To Clipboard");
    };

    // EDIT
    const handleEdit = (link) => {
        setEditingLink(link);
        setEditShortUrl(link.shortUrl);
        setEditUrl(link.url);
    };

    // SAVE EDIT - UI ONLY FOR NOW
    const handleSaveEdit = async () => {

        if (!editingLink) {
            return;
        }
        const editResponse = await fetch("/api/links",
            {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },

                body: JSON.stringify({
                    _id: editingLink._id,
                    url: editUrl,
                    shortUrl: editShortUrl
                })
            })

        const editJson = await editResponse.json();

        if (editJson.success) {
            toast.success("Edited Done");
            fetchLinks();
            setEditingLink(null);
        }
        else {
            toast.error(editJson.message);
        }
    };

    // VISIT
    // const handleVisit = (link) => {
    //     window.open(
    //         `${process.env.NEXT_PUBLIC_URL}/${link.shortUrl}`,
    //         "_blank"
    //     );
    //     fetchLinks()
    // };


    // DELETE
    const handleDelete = (link) => {
        toast("Are you sure you want to delete this link?", {
            action: {
                label: "Delete",
                onClick: async () => {
                    const deleteResponse = await fetch("/api/links",
                        {
                            method: "DELETE",
                            headers: {
                                "content-type": "application/json",
                            },

                            body: JSON.stringify({
                                _id: link._id
                            })
                        })

                    const deleteJson = await deleteResponse.json();

                    if (deleteJson.success) {
                        toast.success("Link deleted successfully");
                        fetchLinks();
                    }
                    else {
                        toast.error(deleteJson.message);
                    }
                },
            },
            cancel: {
                label: "Cancel",
            },
        });
    };

    const totalClicks = links.reduce(
        (total, link) => total + (link.clicks || 0),
        0
    );

    const mostPopularLink = links.reduce((popular, link) => {
        if (!popular || link.clicks > popular.clicks) {
            return link;
        }

        return popular;
    }, null);

    const filteredLinks = links.filter((link) => {
        return (
            link.shortUrl.toLowerCase().includes(search.toLowerCase()) ||
            link.url.toLowerCase().includes(search.toLowerCase())
        );
    });


    return (
        <>
            <main className="min-h-screen bg-[#030712] text-white">

                {/* Background Blurs */}
                <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-violet-700/20 blur-[150px]" />

                <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-600/20 blur-[150px]" />

                {/* Hero */}
                <section className="relative mx-auto my-12 max-w-7xl px-6 py-24">

                    {/* Heading */}
                    <div className="text-center">

                        <span className="rounded-full border border-violet-500/40 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
                            MY DASHBOARD
                        </span>

                        <h1 className="mt-6 text-6xl font-black">
                            Your

                            <span className="block bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                Short Links
                            </span>
                        </h1>

                        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                            Manage, edit and monitor every link you've created.
                        </p>

                    </div>

                    {/* Search */}
                    <div className="mx-auto mt-16 max-w-3xl">

                        <input
                            onChange={handleSearch}
                            name="search"
                            type="text"
                            placeholder="Search by short URL or destination..."
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-7 py-5 text-lg outline-none backdrop-blur-xl focus:border-violet-500"
                        />

                    </div>

                    {/* Stats */}
                    <div className="mt-14 grid gap-6 md:grid-cols-3">

                        {/* Total Links */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500/40">

                            <p className="text-gray-400">
                                Total Links
                            </p>

                            <h2 className="mt-3 text-5xl font-black">
                                {links.length}
                            </h2>

                        </div>

                        {/* Total Clicks */}

                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500/40">

                            <p className="text-gray-400">
                                Total Clicks
                            </p>

                            <h2 className="mt-3 text-5xl font-black">
                                {totalClicks}
                            </h2>

                        </div>


                        {/* Most Popular */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500/40">

                            <p className="text-gray-400">
                                Most Popular
                            </p>

                            {mostPopularLink ? (
                                <>
                                    {/* <h2
                                        onClick={() => handleVisit(mostPopularLink)}
                                        className="mt-3 cursor-pointer text-2xl font-bold text-cyan-400">
                                        /{mostPopularLink.shortUrl}
                                    </h2> */}

                                    <a
                                        href={`${process.env.NEXT_PUBLIC_URL}/${mostPopularLink.shortUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 block cursor-pointer text-2xl font-bold text-cyan-400"
                                    >
                                        /{mostPopularLink.shortUrl}
                                    </a>

                                    <p className="mt-2 text-sm text-gray-500">
                                        {mostPopularLink.clicks} clicks
                                    </p>
                                </>
                            ) : (
                                <h2 className="mt-3 text-xl font-bold text-cyan-400">
                                    -
                                </h2>
                            )}

                        </div>

                    </div>

                    {/* Links */}
                    <div className="mt-20 space-y-8">

                        {links.length === 0 ? (

                            /* No Links */
                            <div className="rounded-[35px] border border-white/10 bg-white/5 py-20 text-center backdrop-blur-xl">

                                <h2 className="text-2xl font-bold text-gray-300">
                                    No links yet
                                </h2>

                                <p className="mt-3 text-gray-500">
                                    Create your first short link to see it here.
                                </p>

                                <Link
                                    href="/URL-Shortner"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow-[0_0_30px_rgba(139,92,246,.4)] transition hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,.6)]"
                                >
                                    Get Started
                                    <ArrowRightIcon size={20} />
                                </Link>

                            </div>

                        ) : filteredLinks.length === 0 ? (

                            <div className="rounded-[35px] border border-white/10 bg-white/5 py-20 text-center backdrop-blur-xl">
                                <h2 className="text-2xl font-bold text-gray-300">
                                    No matching links
                                </h2>

                                <p className="mt-3 text-gray-500">
                                    We couldn't find any links matching your search.
                                </p>
                            </div>

                        ) : (

                            /* Link Cards */
                            filteredLinks.map((link) => (

                                <div
                                    key={link._id}
                                    className="rounded-[35px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:border-violet-500/40"
                                >

                                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                                        {/* URL Information */}
                                        <div>

                                            {/* <h2
                                                onClick={() => handleVisit(link)}
                                                className="cursor-pointer text-3xl font-bold text-cyan-400 transition duration-300 hover:scale-[1.02] hover:text-cyan-300"
                                            >
                                                /{link.shortUrl}
                                            </h2> */}

                                            <a
                                                href={`${process.env.NEXT_PUBLIC_URL}/${link.shortUrl}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block cursor-pointer text-3xl font-bold text-cyan-400 transition duration-300 hover:scale-[1.02] hover:text-cyan-300"
                                            >
                                                /{link.shortUrl}
                                            </a>

                                            <p className="mt-3 break-all text-md  text-gray-400">
                                                {link.url}
                                            </p>

                                        </div>

                                        {/* Visits */}
                                        <div className="text-center">

                                            <p className="text-gray-400">
                                                Clicks
                                            </p>

                                            <h2 className="md:text-5xl text-3xl font-black text-violet-400">
                                                {link.clicks || 0}
                                            </h2>

                                        </div>

                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-8 flex flex-wrap justify-center sm:justify-start gap-4">

                                        {/* Copy */}
                                        <button
                                            onClick={() => handleCopy(link)}
                                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-cyan-500 transition duration-300 hover:scale-110 hover:text-cyan-300"
                                        >
                                            <CopyIcon size={23} />
                                        </button>

                                        {/* Edit */}
                                        <button
                                            onClick={() => handleEdit(link)}
                                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-violet-500 transition duration-300 hover:scale-110 hover:text-violet-300"
                                        >
                                            <SquarePenIcon size={23} />
                                        </button>

                                        {/* Delete */}
                                        <button
                                            onClick={() => handleDelete(link)}
                                            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-red-500 transition duration-300 hover:scale-110 hover:text-red-400"
                                        >
                                            <DeleteIcon size={23} />
                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </section>

                {/* ================= EDIT MODAL ================= */}

                {editingLink && (

                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-md"
                        onClick={() => setEditingLink(null)}
                    >

                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-xl rounded-[30px] border border-white/10 bg-[#0b1120] p-8 shadow-2xl shadow-violet-950/40"
                        >

                            {/* Modal Header */}
                            <div className="flex items-start justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        Edit Short Link
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Update your short link and its destination.
                                    </p>

                                </div>

                                {/* Close */}
                                <button
                                    onClick={() => setEditingLink(null)}
                                    className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl text-gray-500 transition hover:bg-white/5 hover:text-white"
                                >
                                    ×
                                </button>

                            </div>

                            {/* Short URL */}
                            <div className="mt-8">

                                <label className="text-sm font-medium text-gray-300">
                                    Short URL
                                </label>

                                <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-3">

                                    <span className="text-gray-500">
                                        {process.env.NEXT_PUBLIC_URL}/
                                    </span>

                                    <input
                                        type="text"
                                        value={editShortUrl}
                                        onChange={(e) =>
                                            setEditShortUrl(e.target.value)
                                        }
                                        className="w-full bg-transparent px-2 text-white outline-none"
                                        placeholder="my-link"
                                    />

                                </div>

                                <p className="mt-2 text-xs text-gray-500">
                                    Choose a unique name for your short link.
                                </p>

                            </div>

                            {/* Destination URL */}
                            <div className="mt-6">

                                <label className="text-sm font-medium text-gray-300">
                                    Destination URL
                                </label>

                                <input
                                    type="url"
                                    value={editUrl}
                                    onChange={(e) =>
                                        setEditUrl(e.target.value)
                                    }
                                    placeholder="https://example.com"
                                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                                />

                            </div>

                            {/* Buttons */}
                            <div className="mt-8 flex justify-end gap-3">

                                <button
                                    onClick={() => setEditingLink(null)}
                                    className="rounded-xl border border-white/10 px-5 py-3 text-gray-400 transition hover:bg-white/5 hover:text-white"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={handleSaveEdit}
                                    className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/20"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </div>

                    </div>

                )}

            </main>
        </>
    );
};



export default Page;

