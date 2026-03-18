import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true]
    },
    foodId: {
      type: String,
      required: [true]
    }
  },
  {
    timestamps: true
  }
);

export const Favorite = mongoose.model("Favorite", FavoriteSchema);
