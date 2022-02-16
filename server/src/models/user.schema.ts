import * as mongoose from 'mongoose';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../auth/role.enum';

export type userDocument = User & mongoose.Document;

@Schema()
class BookRead {
    @Prop({ ref: 'book'})
    book: mongoose.Types.ObjectId

    @Prop({ default: 0})
    pagesRead: number
}

@Schema()
class Payment {
    @Prop()
    paymentType: string

    @Prop()
    amount: number

    @Prop()
    subscriptionDate: Date
}

@Schema()
export class User {
    @Prop()
    name: string
    
    @Prop()
    email: string

    @Prop()
    password: string

    @Prop({ default: null })
    image: string | null

    @Prop({ default: [Role.User]})
    roles: number[]

    @Prop({ default: null })
    booksRead: BookRead[] | null

    @Prop({ default: null })
    paymentInfo: Payment | null

}

export const UserSchema = SchemaFactory.createForClass(User);