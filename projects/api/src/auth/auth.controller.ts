import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { JwtGuard, LocalGuard } from './guard-strategies';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    // return req.user;
  }

  @UseGuards(JwtGuard)
  @Post('test')
  async test(@Request() req) {
    return req.user;
  }
}
