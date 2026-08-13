import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request) {

    const session = await getServerSession(authOptions);

    const body = await request.json();
    let client = await clientPromise;
    let db = client.db("Shortify");
    const collection = db.collection("urls");

    const existingUrl = await collection.findOne({ shortUrl: body.shortUrl });
    if(existingUrl) {
        return Response.json({
            success: false, error: true,
            message: "Custom Alias already exists. Please choose a different one."
        });
    }

    const result = await collection.insertOne({
        url: body.url,
        shortUrl: body.shortUrl,
        user: body.user,
        clicks: 0
    });

    return new Response(JSON.stringify({
        success: true, error: false,
        message: "URL generated successfully!"
    }), {
        status: 200,
        headers: {
        }
    })
}