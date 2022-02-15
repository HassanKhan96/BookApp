import { IsOptional } from "class-validator"


export class bookModifyDTO {

        @IsOptional()
        title: string

        @IsOptional()
        author: string

        @IsOptional()
        publisher: string

        @IsOptional()
        price: number

        @IsOptional()
        pages: number

        @IsOptional()
        rating: number

        @IsOptional()
        image: string | null
}