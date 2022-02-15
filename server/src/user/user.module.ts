import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModelModule } from '../models/'


@Module({
  imports: [UserModelModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
