import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken
    });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = generateAccessToken(user);

    res.json({
      accessToken: newAccessToken
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { userId } = req.body;

    await User.findByIdAndUpdate(userId, {
      refreshToken: null
    });

    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const googleSignin = async (req, res, next) => {
  try {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const { idToken } = req.body;
    console.log("IDTOKEN: ", idToken);

    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();

    const { email, name, sub, picture } = payload;

    // find or create user in MongoDB
    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        avatar: picture
      });
    }

    // generate your own JWT/session
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken, user });
  } catch (error) {
    console.error("GOOGLE AUTH ERROR:", error);
    next(error);
  }
};
