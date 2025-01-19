import { Request, Response, NextFunction } from "express";
import { UploadService } from "../utils/upload";

export const uploadByLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { link } = req.body;

    if (!link) return res.status(400).json({ message: "Link is required" });

    const result = await UploadService.uploadFile(link);

    res.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadFromDevice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !Array.isArray(req.files))
      return res.status(400).json({ message: "No files uploaded" });

    const results = await UploadService.uploadFiles(req.files);

    res.json({
      success: true,
      message: "Files uploaded successfully",
      data: results.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
      })),
    });
  } catch (error) {
    next(error);
  }
};
