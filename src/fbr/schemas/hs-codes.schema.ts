import { Schema, Document } from 'mongoose';

export interface HSCodeDocument extends Document {
  hS_CODE: string;
  description: string;
}

export const HSCodeSchema = new Schema<HSCodeDocument>({
  hS_CODE: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});
