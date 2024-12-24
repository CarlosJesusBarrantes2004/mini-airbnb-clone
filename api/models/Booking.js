import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  name: { type: String, required: [true, 'Your name is required'] },
  phone: { type: String, required: [true, 'Your phone is required'] },
  price: { type: Number, required: true },
  place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const BookingModel = mongoose.model('Booking', BookingSchema);

export default BookingModel;
