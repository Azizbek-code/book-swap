import { ConflictException, Inject, Injectable } from '@nestjs/common';
import type { DrizzleDB } from 'src/common/types/drizzle';
import { DRIZZLE_DB } from 'src/core/database/db.module';
import { registerDto } from './dto/register.dto';
import { users } from 'src/core/database/schema/user.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthService {
    constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDB) { }

    async register(data: registerDto) {
        try {
            const { email } = data
            const checkUserExists = (await this.db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1))[0] ?? null;
            

            if (checkUserExists) throw new ConflictException()

            const create = await this.db.insert(users).values({ email: data.email, password: data.password }).returning()

            return create
        } catch (error) {
            console.log(error);
            

        }
    }
}
