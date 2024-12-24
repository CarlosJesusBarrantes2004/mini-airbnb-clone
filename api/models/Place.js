import mongoose, { Schema } from 'mongoose';

const PlaceSchema = new Schema(
  {
    title: { type: String, trim: true, required: [true, 'Title is required'] },
    address: {
      type: String,
      trim: true,
      required: [true, 'Address is required'],
    },
    photos: [String],
    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required'],
    },
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const PlaceModel = mongoose.model('Place', PlaceSchema);

export default PlaceModel;
