import { connectToDB } from "@/lib/models/db";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { user: string } }
) {
  try {
    const dbConnection = await connectToDB();

    const user = await User.findById(params.user).populate("posts");
    if (!user) {
      return NextResponse.json({ ErrorMessage: "User not found" });
    }

    return NextResponse.json({ message: `Welcome ${user?.userName}`, user });
  } catch (err) {
    console.error(err);
  }
}
