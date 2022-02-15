import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { bookSchema } from "src/models/book.schema";
import { BookController } from './book.controller';
import { BookService } from "./book.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'book', schema: bookSchema}])],
    controllers: [BookController],
    providers: [BookService]
})
export class BookModule {}