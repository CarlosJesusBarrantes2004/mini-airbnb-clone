import { Router } from "express";
import {
  uploadByLink,
  uploadFromDevice,
} from "../controllers/upload.controller";
import multer from "multer";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload only images."));
    }
  },
});

router.post("/upload-by-link", uploadByLink);

router.post(
  "/upload-from-device",
  upload.array("photos", 10),
  uploadFromDevice
);

export default router;
