import mongoose, { Schema, Document } from "mongoose";

interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  guests: number;
  startDate: Date;
  endDate: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    guests: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model<IBooking>("Booking", BookingSchema);
export default BookingModel;
