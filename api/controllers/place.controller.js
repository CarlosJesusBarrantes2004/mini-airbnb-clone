import Place from '../models/Place.js';

export const getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({}).populate('user');
    res.status(200).json({ success: true, places });
  } catch (error) {
    next(error);
  }
};

export const getPlacesByUser = async (req, res, next) => {
  try {
    const places = await Place.find({ user: req.user.id }).populate('user');
    res.status(200).json({ success: true, places });
  } catch (error) {
    next(error);
  }
};

export const getPlaceById = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!id) {
      const error = new Error('Invalid ID');
      error.status = 400;
      return next(error);
    }

    const place = await Place.findById(req.params.id).populate('user');

    if (!place) {
      const error = new Error('Place not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ success: true, place });
  } catch (error) {
    next(error);
  }
};

export const createPlace = async (req, res, next) => {
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  try {
    const place = await Place.create({
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      user: req.user.id,
    });

    res
      .status(201)
      .json({ success: true, message: 'Place created successfully', place });
  } catch (error) {
    next(error);
  }
};

export const updatePlace = async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  try {
    if (!id) {
      const error = new Error('Invalid ID');
      error.status = 400;
      return next(error);
    }

    const place = await Place.findByIdAndUpdate(
      id,
      {
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      },
      { new: true }
    );

    if (!place) {
      const error = new Error('Place not found');
      error.status = 404;
      return next(error);
    }

    res
      .status(200)
      .json({ success: true, message: 'Place updated successfully', place });
  } catch (error) {
    next(error);
  }
};
