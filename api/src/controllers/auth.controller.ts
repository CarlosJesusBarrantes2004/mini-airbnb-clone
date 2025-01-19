import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";
import { SALT_ROUNDS } from "../config";
import { NextFunction, Request, Response } from "express";
import { clearTokenCookie, setTokenCookie } from "../utils/cookie";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userDoc = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(
      { id: userDoc.id, email: userDoc.email },
      "12h"
    );

    setTokenCookie(res, token);

    res.status(201).json({
      success: true,
      user: {
        id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });

    if (!userDoc)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const isValidPassword = await bcrypt.compare(password, userDoc.password);

    if (!isValidPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    const token = generateToken(
      { id: userDoc.id, email: userDoc.email },
      "12h"
    );

    setTokenCookie(res, token);

    res.json({
      success: true,
      user: {
        id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    clearTokenCookie(res);
    res.status(200).json({ success: true, message: "Signed out successfully" });
  } catch (error) {
    next(error);
  }
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findOne({ _id: req.user?.id });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
