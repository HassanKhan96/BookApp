import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './auth/role.guard';
import { PaymentModule } from './payment/payment.module';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    StripeModule.forRoot({
      apiKey: process.env.STRIPE_SECRET_KEY,
      apiVersion: '2020-08-27'
    }),
    BookModule, 
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UserModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ],
})
export class AppModule {}
