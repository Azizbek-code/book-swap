import { IsEnum, IsOptional, IsString } from "class-validator";
import { bookCondition } from "src/core/database/schema/bookCondition";

export class CreateBookDto {
    @IsString()
    title: string

    @IsString()
    author: string

    @IsString()
    @IsOptional()
    description: string

    @IsEnum(bookCondition)
    @IsOptional()
    bookCondition: string

    @IsString()
    category: string
}
