import { Controller, 
  Get, 
  Post, 
  Body,
  Patch, 
  Param,
  Delete, 
  UseGuards, 
  UseInterceptors, 
  UploadedFile, 
  Request
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { fileUpload } from 'src/utils/fileUpload';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(fileUpload())
  create(
    @Body() createUser: CreateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if(file){
      createUser.image = process.env.BASE_URL + file.path
    }
    return this.userService.create(createUser);
  }

  @Get('getAll')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findOne(@Request() req) {
    return this.userService.findOne(req);
  }

  @Patch(':id')
  @UseInterceptors(fileUpload())
  update(
    @Param('id') id: string, 
    @Body() updateUser: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if(file){
      updateUser.image = process.env.BASE_URL + file.path
    }
    return this.userService.update(id, updateUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
