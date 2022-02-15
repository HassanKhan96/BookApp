import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { loginDto } from 'src/auth/dto/login.dto';
import { registerDTO } from 'src/auth/dto/register.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('login')
    async loginLocal(@Body() login: loginDto){
        return await this.authService.loginLocal(login);
    }

    @Post('register')
    async registerLocal(@Body() registerDto: registerDTO){
        return await this.authService.registerLocal(registerDto);
    }

}
