// this for create Post dto what dot do dto is validating body of the request

import { IsString } from "class-validator";

export class createPostDto {
    @IsString()
    title: string

    @IsString()
    content: string
}