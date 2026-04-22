import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    refreshToken: String
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
