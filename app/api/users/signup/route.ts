import { connectToDB } from "@/lib/models/db";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcrypt";
import User from "@/lib/models/user";
import { cookies } from "next/headers";
import createSessionToken from "@/lib/createToken";
export async function POST(request: NextRequest) {
  try {
    // connect to the database
    const dbConnection = await connectToDB();

    const { email, userName, password } = await request.json();
    //create the user
    /*
        check if the user already exists or not 👀
      */
    const existingUser = await User.findOne({ email });

    //validate inputs
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
      });
    }

    if (!email || email === "") {
      return NextResponse.json({
        message: "Error creating user",
      });
    }

    if (!userName || userName === "") {
      return NextResponse.json({
        message: "Error creating user",
      });
    }

    if (!password || password === "") {
      return NextResponse.json({
        message: "Error creating user",
      });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user
    const newUser = new User({
      email,
      userName,
      password: hashedPassword,
    });

    await newUser.save();
    const userToToken: any = await User.findOne({ email });

    const sessionToken = createSessionToken(userToToken);

    cookies().set("sessionToken", sessionToken, { secure: true });

    //return NextResponse
    return NextResponse.json({
      message: "Created user successfully",
      user: {
        email,
        userName,
        posts: [],
      },
    });
  } catch (error: any) {
    // return the error
    return NextResponse.json({
      message: "Error creating user",
      error,
    });
  }
}
