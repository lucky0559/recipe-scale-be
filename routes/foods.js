import express from "express";
import {
  createFood,
  deleteFood,
  getFood,
  getFoods,
  updateFood
} from "../controllers/food.controller.js";
const router = express.Router();

router.get("/", getFoods);

router.get("/:id", getFood);

router.post("/", createFood);

router.put("/:id", updateFood);

router.delete("/:id", deleteFood);

export default router;
