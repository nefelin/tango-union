import jwt, { SignOptions } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { IUser } from './models/user';

// Type predicate to validate StringValue format (e.g., "15m", "7d", "30s")
function isValidStringValue(value: string): value is StringValue {
  // Matches patterns like: "15", "15m", "15 m", "7d", "30s", etc.
  const stringValuePattern = /^\d+\s*[a-zA-Z]*$/;
  return stringValuePattern.test(value);
}

function getStringValue(envVar: string | undefined, defaultValue: StringValue): StringValue {
  const value = envVar || defaultValue;
  if (!isValidStringValue(value)) {
    throw new Error(`Invalid time format: "${value}". Expected format like "15m", "7d", "30s"`);
  }
  return value;
}

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || '';
const ACCESS_TOKEN_TTL = getStringValue(process.env.ACCESS_TOKEN_TTL, '15m');
const REFRESH_TOKEN_TTL = getStringValue(process.env.REFRESH_TOKEN_TTL, '7d');

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

  const accessTokenOptions: SignOptions = {
    expiresIn: ACCESS_TOKEN_TTL,
  };
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, accessTokenOptions);

  const refreshTokenOptions: SignOptions = {
    expiresIn: REFRESH_TOKEN_TTL,
  };
  const refresh = jwt.sign({ email: user.email }, REFRESH_TOKEN_SECRET, refreshTokenOptions);

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

