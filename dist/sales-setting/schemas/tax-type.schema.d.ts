import { Document } from 'mongoose';
export type TaxTypeDocument = TaxType & Document;
export declare class TaxType {
    name: string;
    code: string;
    percentage: number;
    description: string;
    isActive: boolean;
}
export declare const TaxTypeSchema: import("mongoose").Schema<TaxType, import("mongoose").Model<TaxType, any, any, any, Document<unknown, any, TaxType, any, {}> & TaxType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TaxType, Document<unknown, {}, import("mongoose").FlatRecord<TaxType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<TaxType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
