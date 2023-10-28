import { connectToDB } from "@/lib/models/db";
import Post from "@/lib/models/post";
import { NextResponse } from "next/server";

export async function GET() {
  const dbConnection = await connectToDB();

  try {
    const posts = await Post.find();

    return NextResponse.json(posts.slice(-32));
  } catch (error) {
    // Error handling
    return new NextResponse("Error Fetching Posts", { status: 404 });
  }
}
