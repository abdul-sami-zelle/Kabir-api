import { Schema, Document } from 'mongoose';
export interface UOMDocument extends Document {
    uoM_ID: number;
    description: string;
}
export declare const UOMSchema: Schema<UOMDocument, import("mongoose").Model<UOMDocument, any, any, any, Document<unknown, any, UOMDocument, any, {}> & UOMDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, UOMDocument, Document<unknown, {}, import("mongoose").FlatRecord<UOMDocument>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<UOMDocument> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
