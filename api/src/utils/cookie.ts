import { Response, CookieOptions } from "express";
import { NODE_ENV } from "../config";

const isProduction = NODE_ENV === "production";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? "strict" : "lax",
  secure: isProduction,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 day
  path: "/",
};

export const setTokenCookie = (res: Response, token: string) => {
  res.cookie("token", token, cookieOptions);
};

export const clearTokenCookie = (res: Response) => {
  res.clearCookie("token", cookieOptions);
};
