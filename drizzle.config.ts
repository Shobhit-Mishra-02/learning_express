import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './database/userSchema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: "localhost",
    port: 5432,
    user: "golu02",
    password: "golu02",
    database: "api",
  },
} satisfies Config;