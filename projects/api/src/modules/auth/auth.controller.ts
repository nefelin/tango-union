import { Controller, Request, Post, UseGuards, Res, Body } from '@nestjs/common';
import { JwtGuard, LocalGuard } from './guard-strategies';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUser } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUser, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(createUserDTO, res);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    await this.authService.login(req.user, res);
    res.status(200).send();
  }

  @UseGuards(JwtGuard)
  @Post('test')
  async test(@Request() req) {
    return req.user;
  }

  @Post('refresh')
  async refresh(@Request() req) {
    return req.user;
  }
}
