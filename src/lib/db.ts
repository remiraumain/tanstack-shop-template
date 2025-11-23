import { drizzle } from 'drizzle-orm/neon-http';

const databeseUrl = process.env.DATABASE_URL;
export const db = drizzle(databeseUrl!);