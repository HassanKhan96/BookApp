import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/models/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Types } from 'mongoose';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private UserModel: Model<userDocument>){}

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }


  async findAll(): Promise<User[] | null> {
    return this.UserModel.find();
  }


  async findOne(req: any) {
    
      const userId = req.user?.id 
      
      const user = await this.UserModel.findById(userId);
      
      if(!user) new NotFoundException('No user found with this id.')
      
      return user;
        
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    if(!Types.ObjectId.isValid(id)) new BadRequestException()

    const updatedUser = await this.UserModel.findByIdAndUpdate({_id: id},{ ...updateUserDto }, {new: true});
    
    if(!updatedUser) new NotFoundException('No user found with this id.')

    return updatedUser;
  }


  async remove(id: string) {
    
    if(!Types.ObjectId.isValid(id)) new BadRequestException();

    const deletedUser = await this.UserModel.findOneAndDelete({_id: id}, {new: true});

    if(!deletedUser) new NotFoundException('No user fuond with this id.')

    return deletedUser;
  }


}
