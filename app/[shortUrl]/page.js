import { redirect } from "next/navigation";
import clientPromise from '@/lib/mongodb'

export default async function Page({ params }) {
    const { shortUrl } = await params

    let client = await clientPromise;
    let db = client.db("Shortify");
    const collection = db.collection("urls");

    const existingUrl = await collection.findOne({ shortUrl: shortUrl });
    if (existingUrl) {
        const count = await collection.updateOne({ shortUrl: shortUrl }, { $inc: { clicks: 1 } })
        redirect(existingUrl.url)
    }
    else {
        redirect(`${process.env.NEXT_PUBLIC_URL}`)
    }
}