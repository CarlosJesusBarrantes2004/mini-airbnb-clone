import { Router } from 'express';
import {
  signup,
  signin,
  signout,
  verifyToken,
} from '../controllers/auth.controllers.js';

const router = Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.post('/signout', signout);

router.get('/profile', verifyToken);

export default router;
