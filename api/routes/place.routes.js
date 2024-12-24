import { Router } from 'express';
import {
  getPlaces,
  getPlacesByUser,
  getPlaceById,
  createPlace,
  updatePlace,
} from '../controllers/place.controller.js';
import validateToken from '../middlewares/validateToken.js';

const router = Router();

router.get('/places', validateToken, getPlaces);

router.get('/user-places', validateToken, getPlacesByUser);

router.get('/places/:id', validateToken, getPlaceById);

router.post('/places', validateToken, createPlace);

router.put('/places/:id', validateToken, updatePlace);

export default router;
