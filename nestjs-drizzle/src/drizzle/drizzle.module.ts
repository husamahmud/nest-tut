import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Module({
  providers: [
    {
      provide: 'DRIZZLE_CONFIG',
      inject: [ConfigService],
      useFactory: async () => {
        const connectionString =
          'postgres://postgres:password@localhost:5432/nestjs-drizzle';
        const pool = new Pool({
          connectionString,
        });

        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: ['DRIZZLE_CONFIG'],
})
export class DrizzleModule {}
