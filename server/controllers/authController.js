import User from "../models/userModel.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) return next(createError(400, "Missing fields"));

  const userExist = await User.exists({ email });
  if (userExist) return next(createError(400, "User already exists"));

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashPassword });
  res.status(201).json(newUser);
}

export async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) return next(createError(400, "Missing fields"));

  const user = await User.findOne({ email });
  if (!user) return next(createError(400, "Invalid credentials"));

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return next(createError(400, "Invalid credentials"));

  const token = jwt.sign({ id: user._id }, process.env.JWT);
  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "User logged in", user });
}
export async function logout(req, res, next) {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ message: "User logged out" });
}
