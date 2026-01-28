import User from "../models/userModel.js";
import { createError } from "../utils/error.js";
import bcrypt from "bcryptjs";

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
  res.send("login");
}
export async function logout(req, res, next) {
  res.send("logout");
}
