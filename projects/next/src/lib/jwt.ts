import jwt from 'jsonwebtoken';
import { IUser } from './models/user';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || '';
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '15m';
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || '7d';

export interface TokenPayload {
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export function generateTokens(user: Pick<IUser, 'email' | 'firstName' | 'lastName' | 'roles'>) {
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error('JWT secrets are not configured');
  }

  const payload: TokenPayload = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles,
  };

  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_TTL,
  });

  const refresh = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_TTL,
  });

  return { token, refresh };
}

export function verifyAccessToken(token: string): TokenPayload {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error('JWT secret is not configured');
  }
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): { email: string } {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error('JWT secret is not configured');
  }
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as { email: string };
}

