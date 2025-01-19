import mongoose, { Schema, Document } from "mongoose";

interface IProperty extends Document {
  owner: mongoose.Types.ObjectId;
  title: string;
  description: string;
  extraInfo: string;
  price: number;
  maxGuests: number;
  location: string;
  photos?: Array<{
    url: string;
    publicId: string;
  }>;
}

const PropertySchema = new Schema<IProperty>(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, trim: true, required: [true, "Title is required"] },
    location: {
      type: String,
      trim: true,
      required: [true, "Location is required"],
    },
    photos: [
      {
        url: String,
        publicId: String,
      },
    ],
    description: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    extraInfo: String,
    maxGuests: Number,
    price: Number,
  },
  { timestamps: true }
);

const PropertyModel = mongoose.model<IProperty>("Property", PropertySchema);
export default PropertyModel;
