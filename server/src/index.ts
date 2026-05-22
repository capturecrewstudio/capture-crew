import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { authRouter } from './routes/auth.js';
import { leadsRouter } from './routes/leads.js';
import { mediaRouter } from './routes/media.js';
import { projectsRouter } from './routes/projects.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'capture-crew-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/leads', leadsRouter);
app.use('/api/media', mediaRouter);
app.use('/api/projects', projectsRouter);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(error);
  res.status(500).json({ message: 'Unexpected server error' });
});

app.listen(env.PORT, () => {
  console.log(`Capture Crew API listening on http://localhost:${env.PORT}`);
});
