import express from "express";
import {
  createFood,
  deleteFood,
  getFood,
  getFoods,
  updateFood
} from "../controllers/food.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.get("/", protect, getFoods);

router.get("/:id", protect, getFood);

router.post("/", protect, createFood);

router.put("/:id", protect, updateFood);

router.delete("/:id", protect, deleteFood);

export default router;
