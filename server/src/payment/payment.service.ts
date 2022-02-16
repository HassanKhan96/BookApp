import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectStripe } from 'nestjs-stripe';
import { NotFoundError } from 'rxjs';
import { User, userDocument } from 'src/models/user.schema';
import Stripe from 'stripe';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {

  constructor(
    @InjectModel(User.name) private userModel: Model<userDocument>,
    @InjectStripe() private stripe: Stripe
    ){}

  async create(createPaymentDto: CreatePaymentDto, user: any): Promise<userDocument> {
    const charge = await this.stripe.charges.create({
      source: createPaymentDto.id,
      amount: 500,
      description: createPaymentDto.type,
      currency: 'usd'
    })
    if(!charge) throw new NotAcceptableException('Payment credentials wrong');
    const updatedUser = await this.userModel.findOneAndUpdate(
      { 
        _id: user.id 
      }, 
      {
        paymentInfo: { 
          paymentType: createPaymentDto.type,
          amount: createPaymentDto.amount,
          subcriptionDate: new Date()
        }
      }, 
      { 
        new: true 
      }
    )
    if(!updatedUser) throw new NotFoundException('No user found.');
    console.log(updatedUser)
    return updatedUser;
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
