import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CONTRIBUTOR = 'CONTRIBUTOR',
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  hash: string;
  lastLogin: Date | null;
  refreshHash: string | null;
  roles: UserRole[];
  likedTracks: number[];
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    lastLogin: { type: Date, default: null },
    refreshHash: { type: String, default: null },
    roles: { type: [String], required: true },
    likedTracks: { type: [Number], default: [] },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

