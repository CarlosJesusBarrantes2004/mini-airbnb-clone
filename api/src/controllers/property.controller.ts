import { NextFunction, Request, Response } from "express";
import Property from "../models/Property";

export const getProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const properties = await Property.find({}).populate(
      "owner",
      "_id email username"
    );
    res.status(200).json({ success: true, properties });
  } catch (error) {
    next(error);
  }
};

export const getPropertiesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const properties = await Property.find({ owner: req.user?.id }).populate(
      "owner",
      "_id email username"
    );

    res.status(200).json({ success: true, properties });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ success: false, message: "Invalid id" });

    const property = await Property.findById(req.params.id).populate(
      "owner",
      "_id username email"
    );

    if (!property)
      return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, property });
  } catch (error) {
    next(error);
  }
};

export const createProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      extraInfo,
      price,
      maxGuests,
      location,
      photos,
    } = req.body;

    const property = await Property.create({
      owner: req.user?.id,
      title,
      location,
      photos,
      description,
      extraInfo,
      maxGuests,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({
        success: false,
        message: "Please provide a property id",
      });

    const {
      title,
      description,
      extraInfo,
      price,
      maxGuests,
      location,
      photos,
    } = req.body;

    const property = await Property.findByIdAndUpdate(
      id,
      {
        title,
        location,
        photos,
        description,
        extraInfo,
        maxGuests,
        price,
      },
      { new: true }
    );

    if (!property)
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });

    res
      .status(200)
      .json({ success: true, message: "Place updated successfully", property });
  } catch (error) {
    next(error);
  }
};
