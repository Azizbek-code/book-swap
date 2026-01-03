import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  async register(@Body() data: registerDto) {
    try {
      const response = await this.authService.register(data)

      return response
    } catch (error) {
      console.log('error');
      
    }
  }
}
