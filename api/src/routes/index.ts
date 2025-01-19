import { Router } from "express";
import authRouter from "./auth.route";
import bookingRouter from "./booking.route";
import propertyRouter from "./property.route";
import uploadRouter from "./upload.route";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/bookings", authenticate, bookingRouter);
router.use("/properties", authenticate, propertyRouter);
router.use(authenticate, uploadRouter);

export default router;
