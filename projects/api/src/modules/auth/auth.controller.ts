import { Controller, Request, Post, UseGuards, Body, Res } from '@nestjs/common';
import { JwtGuard, LocalGuard, JwtRefreshGuard } from './guard-strategies';
import { AuthService } from './auth.service';
import { CreateUserInput } from '../users/dto/createUser.input';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserInput) {
    return this.authService.register(createUserDTO);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const tokens = await this.authService.login(req.user);
    res.status(200).send(tokens);
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    await this.authService.logout(req.user);
    return res.status(200).send();
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Request() req, @Res() res: Response) {
    const tokens = await this.authService.refresh(req.user);
    res.status(200).send(tokens);
  }
}
