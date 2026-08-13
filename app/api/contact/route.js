import clientPromise from "@/lib/mongodb";

export async function POST(request) {

    const body = await request.json();
    console.log(body);
    let client = await clientPromise;
    let db = client.db("Shortify");
    const collection = db.collection("contacts");

    const result = await collection.insertOne({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message
    });

    return new Response(JSON.stringify({
        success: true,
        message: "Message sent successfully!"
    }), {
        status: 200
    });
}