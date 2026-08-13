import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { filter } from "motion/react-m";

const userLinks = async (session, collection) => {
    const data = await collection.find({
        user: session.user.email
    }).toArray();

    return data;
};

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        });
    }

    const client = await clientPromise;
    const db = client.db("Shortify");
    const collection = db.collection("urls");

    const links = await userLinks(session, collection);

    return Response.json({
        success: true,
        links: links
    });
}

export async function DELETE(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        });
    }

    let client = await clientPromise;
    let db = client.db("Shortify");
    const collection = db.collection("urls");

    const body = await request.json()
    const id = body._id;
    const objectId = new ObjectId(id)

    const dlt = await collection.deleteOne({ _id: objectId, user: session.user.email })

    if (dlt.deletedCount === 1) {
        return Response.json({
            success: true,
            message: "Deleted"
        });
    }
    else {
        return Response.json({
            success: false,
            message: "Link not found or you don't have permission to delete it"
        });
    }
}

export async function PATCH(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({
            success: false,
            message: "Not authenticated"
        });
    }

    let client = await clientPromise;
    let db = client.db("Shortify");
    const collection = db.collection("urls");

    const body = await request.json()
    const data = body._id;
    const id = new ObjectId(data)

    const url = body.url
    const shortUrl = body.shortUrl

    const update = await collection.updateOne({ _id: id, user: session.user.email },
        {
            $set: {
                url: url,
                shortUrl: shortUrl
            }
        })

    if (update.modifiedCount === 1) {
        return Response.json({
            success: true,
            message: "Edited"
        });
    }
    else {
        return Response.json({
            success: false,
            message: "Not able to edit"
        });
    }
}