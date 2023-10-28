import Post from "@/lib/models/post";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/models/db";
import User from "@/lib/models/user";

export async function POST(request: NextRequest) {
  const dbConnection = await connectToDB(); // connect to db
  const { title, breif, tags, userId, description } = await request.json(); //getting the data from request

  // Array to store validation errors
  let errors = [];

  try {
    // Validation checks
    if (!title) {
      errors.push("Post title is required");
    }

    if (!breif) {
      errors.push("Post breif is required");
    }
    if (!description) {
      errors.push("Post description is required");
    }

    if (!tags) {
      errors.push("Post tags is required");
    }

    if (!userId) {
      errors.push("Post userId is required");
    }

    // Check if there are any validation errors
    if (errors.length > 0) {
      return Response.json(
        {
          message: "Error creating post",
          status: 400,
          errors,
        },
        {
          status: 400,
        }
      );
    }

    // Creating the post
    const newPost = new Post({
      title,
      breif,
      tags,
      userId,
      description,
    });

    await newPost.save(); // Saving the post

    //get the user to save the post
    const user = await User.findById(userId);
    if (!user) return Response.json({ message: "Please sign in", status: 404 });
    user.posts.push(newPost);
    await user.save(); // Saving the user

    return NextResponse.json(newPost);
  } catch (error) {
    // Error handling
    errors.push("Error creating post");
    return Response.json({
      message: "Error creating post",
      status: 400,
      errors,
    });
  }
}

export async function GET() {
  const dbConnection = await connectToDB();
  try {
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    // Error handling
    return new NextResponse("Error Fetching Posts", { status: 404 });
  }
}
