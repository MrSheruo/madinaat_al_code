import { connectToDB } from "@/lib/models/db";
import Post from "@/lib/models/post";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  const dbConnection = await connectToDB();
  const post = await Post.findById(id).populate("userId", "userName");
  return NextResponse.json(post, { status: 200 });
}

// To do the following actions
export async function DELETE(req: Request, { params: { id } }: any) {}
export async function PATCH(req: Request, { params: { id } }: any) {}
