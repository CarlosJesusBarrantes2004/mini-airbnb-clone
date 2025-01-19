import { NextFunction, Request, Response } from "express";
import Booking from "../models/Booking";
import Property from "../models/Property";

export const getBookings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await Booking.find({ user: req.user?.id }).populate(
      "property"
    );
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });

    const booking = await Booking.findById(id).populate("property");

    if (!booking)
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { property, guests, startDate, endDate } = req.body;

  try {
    const existingProperty = await Property.findById(property);

    if (!existingProperty)
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });

    if (guests > existingProperty?.maxGuests)
      return res.status(400).json({
        success: false,
        message: `El máximo de número de invitados es de ${existingProperty.maxGuests}`,
      });

    const booking = await Booking.create({
      property,
      guests,
      startDate,
      endDate,
      user: req.user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    next(error);
  }
};
