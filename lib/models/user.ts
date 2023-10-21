import { Model, Schema, model, models } from "mongoose";
import validator from "validator";
import { userSchema } from "../types";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
    unique: [true, "Email already exists"],
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value: string) => {
        // Ensure the password has a minimum length of 8 characters
        return validator.isLength(value, { min: 8 });
      },
      message: "Password must be at least 8 characters long",
    },
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post", // Assuming there is a "Post" model for referencing
    },
  ],
});

// Creating the User model
const User: Model<userSchema> = models.User || model("User", UserSchema);

export default User;
