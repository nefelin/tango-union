import { User } from '../../../schemas/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export type TokenContent = Pick<User, 'email' | 'firstName' | 'lastName'>;
export default (user: TokenContent, jwt: JwtService, config: ConfigService) => {
  const payload = { email: user.email, firstName: user.firstName, lastName: user.lastName };
  const token = jwt.sign(payload, {
    expiresIn: config.get('ACCESS_TOKEN_TTL'),
    secret: config.get('ACCESS_TOKEN_SECRET'),
  });
  const refresh = jwt.sign(payload, {
    expiresIn: config.get('REFRESH_TOKEN_TTL'),
    secret: config.get('REFRESH_TOKEN_SECRET'),
  });
  return { token, refresh };
};
