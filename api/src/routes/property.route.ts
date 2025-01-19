import { Router } from "express";
import {
  getProperties,
  getPropertyById,
  getPropertiesByUser,
  createProperty,
  updateProperty,
} from "../controllers/property.controller";
import { validate } from "../middlewares/validate";
import { propertySchema } from "../schemas/property.schema";

const router = Router();

router.get("", getProperties);
router.get("/user", getPropertiesByUser);
router.get("/:id", getPropertyById);
router.post("", validate(propertySchema), createProperty);
router.put("/:id", updateProperty);

export default router;
