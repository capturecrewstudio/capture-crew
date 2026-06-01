import bcrypt from 'bcryptjs';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { env } from '../config/env.js';
import { authLimiter } from '../middleware/rateLimit.js';
import { prisma } from '../config/prisma.js';

const router = Router();

const IS_PROD = process.env.NODE_ENV === 'production';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

router.post('/login', authLimiter, async (req, res) => {
  const body = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (!user || !(await bcrypt.compare(body.password, user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // Set httpOnly cookie — not accessible by JS, survives refresh
  res.cookie('cc_admin_token', token, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: IS_PROD ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/',
  });

  // Return token in body as fallback for cross-domain cookie issues
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

router.post('/logout', (_req, res) => {
  res.clearCookie('cc_admin_token', { path: '/' });
  res.status(204).end();
});

// Lets the frontend check if cookie session is still valid
router.get('/me', async (req, res) => {
  const token = req.cookies?.cc_admin_token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string; role: string };
    res.json({ user: { id: payload.id, email: payload.email, role: payload.role } });
  } catch {
    res.clearCookie('cc_admin_token', { path: '/' });
    res.status(401).json({ message: 'Session expired' });
  }
});

export { router as authRouter };
