import { Model, Schema, model, models } from "mongoose";
import { postSchema } from "../types";

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Post title is required"],
  },
  sections: [
    {
      indexN: {
        type: Number,
        required: [true, "Post sections indexN is required"],
      },
      title: {
        type: String,
        required: [true, "Post sections title is required"],
      },
      description: {
        type: String,
        required: [true, "Post sections description is required"],
      },
    },
  ],
  tags: {
    type: [String],
    required: [true, "Post tags is required"],
  },
  userId: {
    type: Schema.Types.ObjectId, // Reference to User _id
    ref: "User", // Reference to the User model
    required: [true, "Post userId is required"],
  },
  createdAt: {
    type: Date,
    required: [true, "Post createdAt is required"],
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    required: [true, "Post lastUpdated is required"],
    default: Date.now,
  },
});

const Post: Model<postSchema> = models.Post || model("Post", PostSchema);

export default Post;
