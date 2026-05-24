import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
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

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(globalLimiter);
app.use(express.json({ limit: '1mb' }));

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

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Unexpected server error' });
});

app.listen(env.PORT, () => {
  console.log(`Capture Crew API listening on http://localhost:${env.PORT}`);
});
