import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DRIZZLE_DB } from "src/core/database/db.module";
import type { DrizzleDB } from "../types/drizzle";
import { users } from "src/core/database/schema/user.schema";
import { eq } from "drizzle-orm";

@Injectable()
export class checkUserDatas {
    constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDB) { }

    async checkUserExists(userId: string) {
        try {
            const user = (await this.db.select().from(users).where(eq(users.id, userId)).limit(1))[0] ?? null

            if (!user) throw new NotFoundException('user not found')

            return {
                data: user
            }
        } catch (error) {
            console.log(error);
        }
    }
}