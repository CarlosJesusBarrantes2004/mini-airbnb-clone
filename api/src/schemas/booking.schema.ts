import { z } from "zod";

export const bookingSchema = z
  .object({
    property: z.string().min(1, "Property is required"),
    guests: z.number(),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().transform((str) => new Date(str)),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
