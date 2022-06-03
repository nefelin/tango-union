import { HttpException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CreateUserInput } from './dto/createUser.input';
import { User, UserDocument, UserRole } from '../../schemas/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email });
  }

  async create(user: CreateUserInput): Promise<Omit<User, 'refreshHash' | 'hash'> | undefined> {
    const existing = await this.userModel.findOne({ email: user.email });
    if (existing) {
      throw new HttpException('Email Address Taken', 400);
    }
    const { password, ...partialUser } = user;
    const newUser = new this.userModel({
      ...partialUser,
      hash: bcrypt.hashSync(password, 10),
      refreshHash: bcrypt.hashSync(password, 10),
      roles: [...user.roles, UserRole.USER],
      lastLogin: null,
    });

    const saved = await newUser.save();
    const { hash, refreshHash, ...lean } = saved.toObject();
    return lean;
  }

  async login(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found in login attempt');
    }
    user.lastLogin = new Date();
    return user.save();
  }
}
