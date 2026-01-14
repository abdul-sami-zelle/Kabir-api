import { Schema, Document } from 'mongoose';
export interface HSCodeDocument extends Document {
    hS_CODE: string;
    description: string;
}
export declare const HSCodeSchema: Schema<HSCodeDocument, import("mongoose").Model<HSCodeDocument, any, any, any, Document<unknown, any, HSCodeDocument, any, {}> & HSCodeDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HSCodeDocument, Document<unknown, {}, import("mongoose").FlatRecord<HSCodeDocument>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<HSCodeDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
