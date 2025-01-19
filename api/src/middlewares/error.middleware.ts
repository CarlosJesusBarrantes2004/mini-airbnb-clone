import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: err.errors.map((error) => error.message).join(", "),
    });
  }

  if (err.name === "ValidationError") {
    const validationErrors = Object.values(err.message);
    return res.status(400).json({ success: false, message: validationErrors });
  }

  const status = err.status || 500;
  const message = err.message || "Something went wrong!";

  return res.status(status).json({
    success: false,
    message,
  });
};
