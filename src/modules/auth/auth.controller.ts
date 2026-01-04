import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login-dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  async register(@Body() data: registerDto, @Res({ passthrough: true }) res: Response) {
    try {
      const response = await this.authService.register(data)
      res.cookie('token', response?.token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      return response
    } catch (error) {
      console.log(error);

    }
  }

  @Post('login')
  async login(@Body() data: loginDto, @Res({ passthrough: true }) res: Response) {
    try {

      const response = await this.authService.login(data);

      res.cookie('token', response?.token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });

      return response;

    } catch (error) {
      throw new error
    }
  }
}
