import { User } from '../../../schemas/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export default (user: User, jwt: JwtService, config: ConfigService) => {
  const payload = { email: user.email, first: user.firstName, last: user.lastName };
  const token = jwt.sign(payload, { expiresIn: config.get('ID_TOKEN_TTL') });
  const refresh = jwt.sign(payload, { expiresIn: config.get('REFRESH_TOKEN_TTL') });
  return { token, refresh };
};
