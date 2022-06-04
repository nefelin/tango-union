import { Controller, Request, Post, UseGuards, Res, Body } from '@nestjs/common';
import { JwtGuard, LocalGuard, JwtRefreshGuard } from './guard-strategies';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { CreateUserInput } from '../users/dto/createUser.input';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDTO: CreateUserInput, @Res({ passthrough: true }) res: Response) {
    return this.authService.register(createUserDTO, res);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    await this.authService.login(req.user, res);
    res.status(200).send();
  }

  @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    await this.authService.logout(req.user, res);
    res.status(200).send();
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Request() req, @Res() res: Response) {
    await this.authService.refresh(req.user, res);
    res.status(200).send();
  }
}
