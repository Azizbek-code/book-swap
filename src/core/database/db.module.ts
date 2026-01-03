import { Global, Module, Logger } from "@nestjs/common";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/user.schema";
import type { DrizzleDB } from "../../common/types/drizzle";

// Symbol for DI
export const DRIZZLE_DB = Symbol("DRIZZLE_DB");

@Global()
@Module({
    providers: [
        {
            provide: DRIZZLE_DB,
            useFactory: async (): Promise<DrizzleDB> => {
                const logger = new Logger("DatabaseModule");

                // Pool yaratish
                const pool = new Pool({
                    connectionString: process.env.DATABASE_URL, // must be string
                });

                // Drizzle ORM instance
                const db = drizzle(pool, { schema });

                try {
                    // connection test
                    await db.execute(`SELECT 1`);
                    logger.log("Database connected successfully!");
                } catch (err) {
                    logger.error("Database connection failed", err);
                    throw err;
                }

                return db;
            },
        },
    ],
    exports: [DRIZZLE_DB],
})
export class DatabaseModule { }
