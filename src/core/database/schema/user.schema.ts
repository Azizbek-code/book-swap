import { sql } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";
import {
    pgTable,
    uuid,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";
import { role } from "./role.enum";


export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    full_name: varchar("full_name", { length: 354 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    phone_number: varchar("phone_number", { length: 13 }).unique(),
    role: role('role').default('user').notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => sql`now()`)
});