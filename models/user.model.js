import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    name: String,
    email: String,
    password: String,
    refreshToken: String,
    googleId: String,
    avatar: String
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
