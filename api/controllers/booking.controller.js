import Booking from '../models/Booking.js';

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate(
      'place'
    );
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      const error = new Error('Invalid ID');
      error.status = 400;
      return next(error);
    }

    const booking = await Booking.findById(req.params.id).populate('place');

    if (!booking) {
      const error = new Error('Booking not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  const { place, checkIn, checkOut, guests, name, phone, price } = req.body;

  try {
    const booking = await Booking.create({
      checkIn,
      checkOut,
      guests,
      name,
      phone,
      price,
      place,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    next(error);
  }
};
