import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  refresh,
  register
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/protect.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/me", protect, getCurrentUser);

export default router;
