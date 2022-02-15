import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';


export class UpdateUserDto extends PartialType(CreateUserDto) {

    name: string | null

    email: string | null

    password: string | null

    image: string | null

    roles: string[] | null
}
