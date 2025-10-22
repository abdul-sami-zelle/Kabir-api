import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaxTypeDocument = TaxType & Document;

@Schema({ timestamps: true })
export class TaxType {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string; // Will be auto-generated

  @Prop({ required: true })
  percentage: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: true })
  isActive: boolean;
}

export const TaxTypeSchema = SchemaFactory.createForClass(TaxType);
