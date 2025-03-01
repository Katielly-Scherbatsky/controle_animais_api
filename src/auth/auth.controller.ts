import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() { email, senha }: { email: string; senha: string }) {
    return this.authService.login(email, senha);
  }
}
