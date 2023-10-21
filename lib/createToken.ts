import jwt from "jsonwebtoken";
import { userSchema } from "./types";

// Secret key for signing the token
const secretKey = "your-secret-key"; // Replace with a strong and secure secret

// Function to create a session token
function createSessionToken(user: userSchema) {
  // Customize the payload as needed
  const payload = {
    userId: user._id,
    email: user.email,
    // Include additional user data as needed
  };

  // Sign the token with the secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: "2h" }); // Adjust the expiration time as needed

  return token;
}

export default createSessionToken;
