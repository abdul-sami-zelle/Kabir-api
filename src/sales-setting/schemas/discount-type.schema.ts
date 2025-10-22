import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiscountTypeDocument = DiscountType & Document;

@Schema({ timestamps: true })
export class DiscountType {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string; // Will be auto-generated

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0, max: 100 })
  percentage: number; // 👈 Added percentage field

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const DiscountTypeSchema = SchemaFactory.createForClass(DiscountType);
