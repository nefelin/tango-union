import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenContent } from './util/jwtPayload';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService, private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: TokenContent) {
    const refresh = request.headers['authorization'].split(' ')[1];
    if (!refresh) {
      throw new UnauthorizedException();
    }

    const { firstName, lastName, email } = payload;

    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.toObject().refreshHash !== refresh) {
      throw new UnauthorizedException();
    }

    return { firstName, lastName, email };
  }
}
