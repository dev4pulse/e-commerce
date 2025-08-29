import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = Router();
const ACCESS_TTL = '15m';
const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const setRefreshCookie = (res, token) =>
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: true,      // set true in production (HTTPS)
    sameSite: 'lax',
    maxAge: REFRESH_TTL_MS,
    path: '/api/auth/refresh'
  });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password are required' });

  const normalizedEmail = String(email).trim().toLowerCase();
  const exists = await User.findOne({ email: normalizedEmail }).lean();
  if (exists) return res.status(409).json({ message: 'Email already in use' });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    phone: String(phone || '').trim() || undefined,
    passwordHash
  });

  const accessToken = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });
  const refreshToken = jwt.sign({ sub: user._id, type: 'refresh' }, process.env.JWT_SECRET, { expiresIn: '7d' });
  setRefreshCookie(res, refreshToken);

  res.status(201).json({
    accessToken,
    user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
  });
});

// POST /api/auth/login
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

// POST /api/auth/refresh
router.post('/refresh', (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const accessToken = jwt.sign({ sub: payload.sub }, process.env.JWT_SECRET, { expiresIn: ACCESS_TTL });
    res.json({ accessToken });
  } catch {
    res.status(401).json({ message: 'Invalid refresh' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('refreshToken', { path: '/api/auth/refresh' });
  res.status(204).end();
});

export default router;
