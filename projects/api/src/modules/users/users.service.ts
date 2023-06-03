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
      roles: [UserRole.USER],
      lastLogin: new Date(),
    });

    const saved = await newUser.save();
    const { hash, refreshHash, ...lean } = saved.toObject();
    return lean;
  }

  async login(email: string, refreshHash: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
    user.lastLogin = new Date();
    user.refreshHash = refreshHash;
    return user.save();
  }

  async logout(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
    user.refreshHash = null;
    return user.save();
  }

  async refresh(email: string, refresh: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User does not exist');
    }
    user.refreshHash = refresh;
    return user.save();
  }
}
