// api/routes/auth.js
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = Router();
const ACCESS_TTL = '15m';
const setRefreshCookie = (res, token) => res.cookie('refreshToken', {
  httpOnly: true, secure: true, sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, path: '/api/auth/refresh'
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });

  const user = await User.findOne({ email: String(email).trim().toLowerCase() }).select('+passwordHash');
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });
  const refreshToken = jwt.sign({ sub: user._id, type: 'refresh' }, process.env.JWT_SECRET, { expiresIn: '7d' });
  setRefreshCookie(res, refreshToken);
  res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email, phone: user.phone } });
});

export default router;
