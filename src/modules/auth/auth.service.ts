import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { DrizzleDB } from 'src/common/types/drizzle';
import { DRIZZLE_DB } from 'src/core/database/db.module';
import { registerDto } from './dto/register.dto';
import { users } from 'src/core/database/schema/user.schema';
import { eq, or } from 'drizzle-orm';
import { loginDto } from './dto/login-dto';
import bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDB, private jwt: JwtService) { }

    async register(data: registerDto) {
        try {
            const checkUserExists = (await this.db
                .select()
                .from(users)
                .where(or(
                    eq(users.username, data.username),
                    eq(users.email, data.email)
                ))
                .limit(1))[0] ?? null;
            if (checkUserExists) throw new ConflictException()
            data.password = await bcrypt.hash(data.password, 12)

            const [created] = (await this.db.insert(users).values(data).returning({
                id: users.id,
                full_name: users.full_name,
                email: users.email,
                username: users.username,
                phoneNumber: users.phone_number,
                createdAt: users.createdAt
            }))

            const token = this.jwt.sign(created)

            return {
                massage: `welcome back ${created.full_name}`,
                data: { ...created },
                token: token
            }

        } catch (error) {
            throw new Error(error)
        }
    }

    async login(data: loginDto) {
        try {
            const { email, password } = data

            const checkUserExists = (await this.db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .limit(1))[0] ?? null;

            if (!checkUserExists) throw new UnauthorizedException()
        } catch (error) {
            console.log(error);
        }
    }
}
