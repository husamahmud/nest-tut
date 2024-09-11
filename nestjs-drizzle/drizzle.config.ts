import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema.ts',
  out: './drizzle',
  dbCredentials: {
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    database: 'nestjs-drizzle',
    port: 5432,
    ssl: false,
  },
});
