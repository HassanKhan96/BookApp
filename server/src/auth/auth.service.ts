import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { loginDto } from 'src/auth/dto/login.dto';
import { User, userDocument } from 'src/models/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { registerDTO } from 'src/auth/dto/register.dto';
import { tokenDTO } from 'src/auth/dto/token.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private readonly userModel: Model<userDocument>,
        private jwtService: JwtService
    ) { }

    //user login service.
    async loginLocal(user: loginDto): Promise<tokenDTO> {
        //finding user in db.
        const result = await this.userModel.findOne({ email: user.email });
        
        if(!result){
            throw new UnauthorizedException('Invalid credentials.');
        }

        //comparing password.
        const passwordMatch = await bcrypt.compare(user.password, result.password);
        if(!passwordMatch){
            throw new UnauthorizedException('Invalid credentials.');
        }

        //returning token.
        return await this.signPayload({id: result._id, email: result.email, name: result.name, roles: result.roles});
    }


    //user register service.
    async registerLocal(user: registerDTO): Promise<tokenDTO> {
        //checking if email already exists.
        const userExists = await this.userModel.findOne({email: user.email});
        if(userExists){
            throw new ConflictException('Email already exists.');
        }

        //generating password hash.
        const passwordHash = await bcrypt.hash(user.password, 10);
        const newUser = new this.userModel({...user, password: passwordHash});
        await newUser.save();

        //returning token.
        return await this.signPayload({id: newUser._id, email: newUser.email, name: newUser.name, roles: newUser.roles });
    }

    
    //generating token on payload.
    async signPayload(payload: { id: string, email: string, name: string, roles: number[] }) {
        const token = this.jwtService.sign(payload);
        return { token };
    }
}
