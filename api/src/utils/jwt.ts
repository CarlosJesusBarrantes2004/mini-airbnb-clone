import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (payload: TokenPayload, expiresIn = "1d") => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
  return token;
};

export const verifyToken = (token: string) =>
  jwt.verify(token, JWT_SECRET) as TokenPayload;
