import { connectToDB } from "@/lib/models/db";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    // connect to the database
    const dbConnection = await connectToDB();
    // get all the users
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error: any) {
    // return the error
    return NextResponse.json({
      message: "Error creating user",
      error,
    });
  }
}
