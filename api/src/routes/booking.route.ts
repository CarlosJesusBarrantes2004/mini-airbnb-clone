import { Router } from "express";
import {
  getBookings,
  getBooking,
  createBooking,
} from "../controllers/booking.controller.js";
import { validate } from "../middlewares/validate";
import { bookingSchema } from "../schemas/booking.schema";

const router = Router();

router.get("", getBookings);
router.get("/:id", getBooking);
router.post("", validate(bookingSchema), createBooking);

export default router;
