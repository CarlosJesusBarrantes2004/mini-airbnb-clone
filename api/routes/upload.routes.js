import { Router } from 'express';
import {
  uploadByLink,
  uploadFromDevice,
} from '../controllers/upload.controller.js';
import multer from 'multer';

const router = Router();

router.post('/upload-by-link', uploadByLink);

const photosMiddleware = multer({ dest: 'uploads' });

router.post(
  '/upload-from-device',
  photosMiddleware.array('photos', 100),
  uploadFromDevice
);

export default router;
