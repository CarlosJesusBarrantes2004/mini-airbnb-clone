import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../libs/jwt.js';
import { JWT_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

const bcryptSalt = bcrypt.genSaltSync(10);

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const passwordHash = password && bcrypt.hashSync(password, bcryptSalt);

    const userDoc = await User.create({
      username,
      email,
      password: passwordHash,
    });

    const token = generateToken({ id: userDoc._id }, '12h');

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 1000 * 60 * 60 * 12, // 12h
    });

    res.status(201).json({
      success: true,
      user: {
        id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Please provide email and password');
    error.status = 400;
    return next(error);
  }

  try {
    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      return next(error);
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (!passOk) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      return next(error);
    }

    const token = generateToken({ id: userDoc._id }, '12h');

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 1000 * 60 * 60 * 12, // 12h
    });

    res.json({
      success: true,
      user: {
        id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    res.cookie('token', '', { expires: new Date(0) });
    res.status(200).json({ success: true, message: 'Signed out successfully' });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    const error = new Error('Not token provided');
    error.status = 401;
    return next(error);
  }

  jwt.verify(token, JWT_SECRET, async (error, user) => {
    if (error) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }

    const userDoc = await User.findById(user.id);

    if (!userDoc) {
      const err = new Error('Unauthorized');
      err.status = 401;
      return next(err);
    }

    return res.json({
      success: true,
      user: {
        id: userDoc._id,
        username: userDoc.username,
        email: userDoc.email,
      },
    });
  });
};
