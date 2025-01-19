import { Router } from "express";
import {
  register,
  login,
  logout,
  validateToken,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/validate-token", authenticate, validateToken);

export default router;
