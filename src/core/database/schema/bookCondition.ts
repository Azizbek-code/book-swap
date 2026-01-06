import { pgEnum } from "drizzle-orm/pg-core";

export const bookCondition = pgEnum("book_condition",["new","old","used","good"])