import { connectToDB } from "@/lib/models/db";
import User from "@/lib/models/user";
export async function GET() {
  try {
    // connect to the database
    const dbConnection = await connectToDB();
    // get all the users
    const users = await User.find();
    return Response.json(users);
  } catch (error: any) {
    // return the error
    return Response.json({
      message: "Error creating user",
      error,
    });
  }
}
