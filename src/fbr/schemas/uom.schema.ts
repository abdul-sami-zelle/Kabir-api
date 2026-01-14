import { Schema, Document } from 'mongoose';

export interface UOMDocument extends Document {
  uoM_ID: number;
  description: string;
}

export const UOMSchema = new Schema<UOMDocument>({
  uoM_ID: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
});
