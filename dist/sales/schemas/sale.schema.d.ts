import { Document, Types } from 'mongoose';
export type SaleDocument = Sale & Document;
export declare class Sale {
    customer_id: Types.ObjectId;
    customer_code: string;
    basic_info: {
        company_status: string;
        company_group: string;
        cnic: string;
        country: string;
        currency: string;
    };
    inv_no: string;
    ref_no: string;
    issue_date: string;
    due_date: string;
    details: {
        items: {
            id: string;
            name: string;
            qty: number;
            rate: number;
            amount: number;
            hs_code?: string;
            fbr_code?: string;
        }[];
        sub_total: number;
        discount?: {
            _id?: Types.ObjectId;
            percentage?: number;
            value?: number;
        } | null;
        tax?: {
            _id?: Types.ObjectId;
            percentage?: number;
            value?: number;
        } | null;
        grand_total: number;
    };
}
export declare const SaleSchema: import("mongoose").Schema<Sale, import("mongoose").Model<Sale, any, any, any, Document<unknown, any, Sale, any, {}> & Sale & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sale, Document<unknown, {}, import("mongoose").FlatRecord<Sale>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Sale> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
