import { cookies } from "next/headers";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import axios from "axios";
import { authObject } from "./types";
export async function getSession() {
  const token = cookies().get("sessionToken")?.value || null;
  if (!token) {
    return null;
  }
  const decoded = jwt.decode(token, { complete: true });
  if (
    decoded instanceof TokenExpiredError ||
    decoded instanceof JsonWebTokenError
  ) {
    return null;
  }
  // @ts-ignore
  const userId = decoded?.payload.userId;
  try {
    const user = await axios.get(`http://localhost:3000/api/users/${userId}`);
    const data: authObject = {
      authStatues: true,
      dataObject: user.data,
    };
    return data;
  } catch (error) {
    await axios.get("/api/posts");
    console.error(error);
    return null;
  }
}