import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  extraInfo: z.string().optional(),
  price: z.number().min(1, "Price is required"),
  maxGuests: z.number().min(1, "Max Guests is required"),
  location: z.string().min(1, "Location is required"),
  photos: z
    .array(
      z.object({
        url: z.string(),
        publicId: z.string(),
      })
    )
    .min(1, "At least one photo is required"),
});
