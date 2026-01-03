import * as schema from "../../core/database/schema/user.schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export type DrizzleDB = NodePgDatabase<typeof schema>;
