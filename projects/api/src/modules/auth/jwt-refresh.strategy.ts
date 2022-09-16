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
    console.log({ refresh });
    if (!refresh) {
      throw new UnauthorizedException();
    }

    const { email } = payload;
    const user = await this.userService.findOne(email);
    console.log({ email, user, refresh: user.refreshHash, obj: user.toObject().refreshHash });
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.toObject().refreshHash !== refresh) {
      throw new UnauthorizedException();
    }

    console.log('passed');
    return { email };
  }
}
