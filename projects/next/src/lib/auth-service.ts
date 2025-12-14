import bcrypt from 'bcrypt';
import { connectToDatabase } from './db';
import { User, IUser } from './models/user';
import { generateTokens, verifyAccessToken, verifyRefreshToken } from './jwt';
import { UserRole } from './models/user';

export async function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  await connectToDatabase();

  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw new Error('Email Address Taken');
  }

  const hash = bcrypt.hashSync(data.password, 10);
  const refreshHash = bcrypt.hashSync(data.password, 10);

  const user = new User({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    hash,
    refreshHash,
    roles: [UserRole.USER],
    lastLogin: new Date(),
  });

  const saved = await user.save();
  const { hash: _, refreshHash: __, ...userData } = saved.toObject();

  return generateTokens(userData as Pick<IUser, 'email' | 'firstName' | 'lastName' | 'roles'>);
}

export async function loginUser(email: string, password: string) {
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = bcrypt.compareSync(password, user.hash);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const tokens = generateTokens({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles,
  });

  user.lastLogin = new Date();
  user.refreshHash = tokens.refresh;
  await user.save();

  return tokens;
}

export async function logoutUser(email: string) {
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User does not exist');
  }

  user.refreshHash = null;
  await user.save();
}

export async function refreshTokens(refreshToken: string) {
  await connectToDatabase();

  const { email } = verifyRefreshToken(refreshToken);
  const user = await User.findOne({ email });

  if (!user || user.refreshHash !== refreshToken) {
    throw new Error('Invalid refresh token');
  }

  const tokens = generateTokens({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    roles: user.roles,
  });

  user.refreshHash = tokens.refresh;
  await user.save();

  return tokens;
}

export function getCurrentUser(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.substring(7);
  try {
    return verifyAccessToken(token);
  } catch {
    return null;
  }
}

