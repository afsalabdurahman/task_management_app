import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  
  name: string;
  email: string;
  password: string;
  isverified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  isverified: { type: Boolean, default: false }
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);