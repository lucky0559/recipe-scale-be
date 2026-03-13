import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, "Please provide image url"]
    },
    name: {
      type: String,
      required: [true, "Please provide name"]
    },
    description: {
      type: String,
      required: [true, "Please provide description"]
    },
    ingredients: [
      {
        name: String,
        needed: Number,
        unit: String
      }
    ],
    categories: [String]
  },
  {
    timestamps: true
  }
);

export const Food = mongoose.model("Food", FoodSchema);
