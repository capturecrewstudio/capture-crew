import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { ZodError } from 'zod';
import { env } from './config/env.js';
import { prisma } from './config/prisma.js';
import { globalLimiter } from './middleware/rateLimit.js';
import { authRouter } from './routes/auth.js';
import { blogRouter } from './routes/blog.js';
import { categoriesRouter } from './routes/categories.js';
import { contentRouter } from './routes/content.js';
import { leadsRouter } from './routes/leads.js';
import { mediaRouter } from './routes/media.js';
import { projectsRouter } from './routes/projects.js';
import { seoRouter } from './routes/seo.js';
import { testimonialsRouter } from './routes/testimonials.js';

const app = express();

// Trust Render/proxy's X-Forwarded-For header for accurate rate limiting
app.set('trust proxy', 1);

// Build allowed origins list from comma-separated CLIENT_ORIGIN env var
const allowedOrigins = env.CLIENT_ORIGIN.split(',').map(o => o.trim()).filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o => origin.startsWith(o.replace(/\/$/, '')))) return callback(null, true);
    callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(cookieParser());
app.use(globalLimiter);
app.use(express.json({ limit: '10mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'capture-crew-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/content', contentRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/media', mediaRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/seo', seoRouter);
app.use('/api/testimonials', testimonialsRouter);

// 404 for unmatched API routes
app.use('/api/*', (_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Global error handler — ZodError → 400, everything else → 500
app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json({ message: 'Validation error', errors: error.flatten().fieldErrors });
  }
  // Log non-validation errors server-side only
  console.error('[error]', error instanceof Error ? error.message : error);
  res.status(500).json({ message: 'Unexpected server error' });
});

const server = app.listen(env.PORT, () => {
  console.log(`Capture Crew API listening on http://localhost:${env.PORT}`);
});

// Graceful shutdown — close DB connections before process exits
async function shutdown() {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
