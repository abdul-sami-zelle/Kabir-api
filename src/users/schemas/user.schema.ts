// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  otp?: string;

  @Prop()
  otpExpires?: Date;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  roleId: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: false })
  profileImage: string;

  @Prop({ required: false })
  dob: string;

  @Prop()
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
