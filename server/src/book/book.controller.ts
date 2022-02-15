import { 
    Body, 
    Controller, 
    Get, 
    Post, 
    Param, 
    Delete, 
    Patch, 
    UseInterceptors, 
    UploadedFile,
    UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { join } from "path";
import { Role } from "src/auth/role.enum";
import { Roles } from "src/auth/roles.decorator";
import { fileUpload } from "src/utils/fileUpload";
import { BookService } from './book.service';
import { bookCreateDTO } from "./dto/book-create.dto";
import { bookModifyDTO } from "./dto/book-modify.dto";


@Controller('/api/book')
export class BookController {

    constructor(
        private readonly bookService: BookService
    ) { }

    @Post()
    @UseInterceptors(fileUpload())
    async addBook(
        @Body() body: bookCreateDTO,
        @UploadedFile() file: Express.Multer.File | null
    ) {
        if(file){
            body.image = process.env.BASE_URL + file.path
        }
        return await this.bookService.uploadBook(body);
    }

    @Get('/')
    async getAllBook() {
        return await this.bookService.getBooks();
    }

    @Get('/:id')
    async getBook(@Param('id') id: string) {
        return await this.bookService.getBook(id);
    }

    @Patch('/:id')
    @UseInterceptors(fileUpload())
    async updateBook(
        @Param('id') id: string,
        @Body() body: bookModifyDTO,
        @UploadedFile() file: Express.Multer.File | null
    ) {
        if(file){
            body.image = process.env.BASE_URL + file.path
        }
        return await this.bookService.modifyBook(id, body)
    }

    @Roles(Role.Admin)
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async removeBook(@Param('id') id: string) {
        return await this.bookService.deleteBook(id);
    }
}