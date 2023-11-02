import { connectToDB } from "@/lib/models/db";
import Post from "@/lib/models/post";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const dbConnection = await connectToDB();
  const post = await Post.findById(id).populate("userId", "userName");
  return NextResponse.json(post, { status: 200 });
}

// Todo the following actions

export async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const dbConnection = await connectToDB();
  const post = await Post.findByIdAndDelete(id);
  // delete the post from the user also
  const user = await User.findByIdAndUpdate(post?.userId, {
    $pull: { posts: post?._id },
  });

  return NextResponse.json({
    message: "Post deleted successfully",
  });
}
export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const dbConnection = await connectToDB();
  const body = await req.json();
  const post = await Post.findByIdAndUpdate(id, body);
  return NextResponse.json({
    message: "Post updated successfully",
    post,
  });
}
