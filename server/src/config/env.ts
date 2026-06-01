import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.preprocess((v) => v || undefined, z.string().optional()),
  JWT_SECRET: z.string().min(24),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
  R2_ACCOUNT_ID: z.preprocess((v) => v || undefined, z.string().optional()),
  R2_ACCESS_KEY_ID: z.preprocess((v) => v || undefined, z.string().optional()),
  R2_SECRET_ACCESS_KEY: z.preprocess((v) => v || undefined, z.string().optional()),
  R2_BUCKET: z.preprocess((v) => v || undefined, z.string().optional()),
  R2_PUBLIC_URL: z.preprocess((v) => v || undefined, z.string().optional()),
  RESEND_API_KEY: z.preprocess((v) => v || undefined, z.string().optional()),
  STUDIO_EMAIL: z.preprocess((v) => v || undefined, z.string().email().optional()),
  ADMIN_EMAIL: z.preprocess((v) => v || undefined, z.string().email().optional()),
  ADMIN_PASSWORD: z.preprocess((v) => v || undefined, z.string().optional()),
});

export const env = envSchema.parse(process.env);
