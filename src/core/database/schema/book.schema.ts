import { uuid, text, varchar, pgTable, timestamp } from "drizzle-orm/pg-core";
import { bookCondition } from "./bookCondition";
import { users } from "./user.schema";
import { sql } from "drizzle-orm";

export const book = pgTable("books", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    description: text("description"),
    bookCondition: bookCondition('bookCondition').default('new').notNull(),
    category: text("category").notNull(),
    ownerId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => sql`now()`)
})