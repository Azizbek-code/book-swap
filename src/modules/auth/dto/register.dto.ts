import { IsEmail, IsString } from "class-validator";

export class registerDto {
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    password: string
}