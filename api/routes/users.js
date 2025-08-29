// api/routes/users.js
import { Router } from 'express';
import User from '../models/User.js';
import { verifyAccess } from '../middleware/auth.js';

const router = Router();

// GET /api/users/me — current user profile (safe: excludes passwordHash)
router.get('/me', verifyAccess, async (req, res) => {
  const user = await User.findById(req.userId).select('-passwordHash').lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

export default router;
