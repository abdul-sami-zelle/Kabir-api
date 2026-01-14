import { Document, Types } from 'mongoose';
export type SaleDocument = Sale & Document;
export declare class Sale {
    customer_id: Types.ObjectId;
    customer_code: string;
    basic_info: {
        company_status: string;
        company_name: string;
        company_group: string;
        cnic: string;
        country: string;
        currency: string;
    };
    inv_no: string;
    ref_no: string;
    issue_date: string;
    due_date: string;
    sale_type: string;
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
        discount: any;
        tax: {
            percentage: string;
            value: string;
        };
        grand_total: number;
    };
    sendToFBR: boolean;
    fbr_response: any;
    fbr_invoice_no: string;
    fbr_status: string;
    fbr_error: string;
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
