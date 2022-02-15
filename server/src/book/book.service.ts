import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { bookCreateDTO } from "./dto/book-create.dto";
import {  Model } from "mongoose";
import { bookType } from "src/models/book.schema";
import { bookModifyDTO } from "./dto/book-modify.dto";
@Injectable()
export class BookService {

    constructor(@InjectModel('book') private bookModel: Model<bookType>) { }

    async uploadBook(body: bookCreateDTO) {
        try {
            const newBook = new this.bookModel({
                title: body.title,
                author: body.author,
                publisher: body.publisher,
                price: body.price,
                pages: body.pages,
                image: body.image
            })
            return await newBook.save();
        }
        catch (error) {
            throw new Error(error)
        }
    }

    async getBooks() {
        return await this.bookModel.find();
    }

    async getBook(id: string) {
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException('No book found.')
        }
        return book;
    }

    async modifyBook(
        id: string,
        body: bookModifyDTO
    ) {
        const result = await this.bookModel.findOneAndUpdate({ _id: id }, { ...body }, { new: true })
        if(!result){
            throw new NotFoundException('Error in update.');
        }
        return result;
    }

    async deleteBook(id: string) {
        const result = await this.bookModel.findOneAndDelete({ _id: id })
        if (!result) {
            throw new NotFoundException('No book found with this id.')
        }
        return result;
    }

}