import { env } from '@/lib/env.mjs';
import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

const connection = connect({
  url: env.DATABASE_URL
});

export const db = drizzle(connection);
