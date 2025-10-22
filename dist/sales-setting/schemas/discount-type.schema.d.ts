import { Document } from 'mongoose';
export type DiscountTypeDocument = DiscountType & Document;
export declare class DiscountType {
    name: string;
    code: string;
    description: string;
    percentage: number;
    isActive: boolean;
}
export declare const DiscountTypeSchema: import("mongoose").Schema<DiscountType, import("mongoose").Model<DiscountType, any, any, any, Document<unknown, any, DiscountType, any, {}> & DiscountType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DiscountType, Document<unknown, {}, import("mongoose").FlatRecord<DiscountType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<DiscountType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
