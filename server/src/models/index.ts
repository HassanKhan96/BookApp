import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from './user.schema';

export const UserModelModule = MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])