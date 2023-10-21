import { connectToDB } from "@/lib/models/db";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import createSessionToken from "@/lib/createToken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    // create log in functions and save the user to a cookie and use it as a authentication

    const dbConnection = await connectToDB();

    const { email, password } = await req.json();

    if (!email) return NextResponse.json({ message: "Email is required" });
    if (!password)
      return NextResponse.json({ message: "Password is required" });

    //check if the user already exists or not
    const existingUser = await User.findOne({ email });

    //compare between password and hashed password

    if (!existingUser)
      return NextResponse.json({ errorMessage: "User does not exist" });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid === false)
      return NextResponse.json({ errorMessage: "Invalid password" });

    const sessionToken = createSessionToken(existingUser);

    cookies().set("sessionToken", sessionToken, { secure: true });

    return NextResponse.json({
      message: "Logged in successfully",
      user: {
        email: existingUser.email,
        id: existingUser._id,
        userName: existingUser.userName,
      },
      sessionToken,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      {
        status: 500,
      }
    );
  }
}
