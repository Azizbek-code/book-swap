import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class registerDto {

    @IsString()
    full_name: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    username: string

    @IsPhoneNumber('UZ')
    phone_number: string

    @IsString()
    location: string

    @IsString()
    password: string
}