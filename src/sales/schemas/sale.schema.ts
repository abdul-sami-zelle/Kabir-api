// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// export type SaleDocument = Sale & Document;

// @Schema({ timestamps: true })
// export class Sale {
//     @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
//     customer_id: Types.ObjectId;

//     @Prop({ required: true })
//     customer_code: string;

//     @Prop({
//         type: {
//             company_status: { type: String, required: true },
//             company_name: { type: String, required: true },
//             company_group: { type: String, required: true },
//             cnic: { type: String, required: true },
//             country: { type: String, required: true },
//             currency: { type: String, required: true },
//         },
//         required: true,
//     })
//     basic_info: {
//         company_status: string;
//         company_group: string;
//         cnic: string;
//         country: string;
//         currency: string;
//     };

//     @Prop({ required: true })
//     inv_no: string;

//     @Prop({ required: true })
//     ref_no: string;

//     @Prop({ required: true })
//     issue_date: string;

//     @Prop({ required: true })
//     due_date: string;

//     @Prop({
//         type: {
//             items: [
//                 {
//                     id: { type: String, required: true },
//                     name: { type: String, required: true },
//                     qty: { type: Number, required: true },
//                     rate: { type: Number, required: true },
//                     amount: { type: Number, required: true },
//                     hs_code: { type: String },
//                     fbr_code: { type: String },
//                 },
//             ],
//             sub_total: { type: Number, required: true },
//             discount: {
//                 type: {
//                     _id: { type: Types.ObjectId, ref: 'DiscountType' },
//                     percentage: { type: Number },
//                     value: { type: Number },
//                 },
//                 default: null,
//             },
//             tax: {
//                 type: {
//                     rateid: { type: Number },
//                     ratedescr: { type: String },
//                     ratevalue: { type: Number },
//                 },
//                 default: null,
//             },
//             grand_total: { type: Number, required: true },
//         },
//         required: true,
//     })
//     details: any;

//     @Prop({ default: false })
//     sendToFBR: boolean;

//     @Prop({
//         type: {
//             invoiceNumber: { type: String },
//             dated: { type: String },
//             validationResponse: { type: Object },
//         },
//         default: null,
//     })
//     fbr_response: {
//         invoiceNumber?: string;
//         dated?: string;
//         validationResponse?: any;
//     } | null;

//     @Prop({ type: String, default: null })
//     fbr_invoice_no: string;


//     @Prop({
//         type: String,
//         enum: ['PENDING', 'SENT', 'FAILED'],
//         default: 'PENDING',
//     })
//     fbr_status: string;

//     @Prop({ type: String, default: null })
//     fbr_error: string;


//     // details: {
//     //     items: {
//     //         id: string;
//     //         name: string;
//     //         qty: number;
//     //         rate: number;
//     //         amount: number;
//     //         hs_code?: string;
//     //         fbr_code?: string;
//     //     }[];
//     //     sub_total: number;
//     //     discount?: {
//     //         _id?: Types.ObjectId;
//     //         percentage?: number;
//     //         value?: number;
//     //     } | null;
//     //     tax?: {
//     //         _id?: Types.ObjectId;
//     //         percentage?: number;
//     //         value?: number;
//     //     } | null;
//     //     grand_total: number;
//     // };
// }

// export const SaleSchema = SchemaFactory.createForClass(Sale);



import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SaleDocument = Sale & Document;

@Schema({ timestamps: true })
export class Sale {

  // ================= CUSTOMER =================
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true })
  customer_id: Types.ObjectId;

  @Prop({ type: String, required: true })
  customer_code: string;

  // ================= BASIC INFO =================
  @Prop({
    type: {
      company_status: { type: String, required: true },
      company_name: { type: String, required: true },
      company_group: { type: String, required: false },
      cnic: { type: String, required: true },
      country: { type: String, required: true },
      currency: { type: String, required: true },
    },
    required: true,
  })
  basic_info: {
    company_status: string;
    company_name: string;
    company_group: string;
    cnic: string;
    country: string;
    currency: string;
  };

  // ================= INVOICE =================
  @Prop({ type: String, required: true })
  inv_no: string;

  @Prop({ type: String, required: true })
  ref_no: string;

  @Prop({ type: String, required: true })
  issue_date: string;

  @Prop({ type: String, required: true })
  due_date: string;

  @Prop({ type: String, required: true })
  sale_type: string;

  // ================= SALE DETAILS =================
  @Prop({
    type: {
      items: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
          qty: { type: Number, required: true },
          rate: { type: Number, required: true },
          amount: { type: Number, required: true },
          hs_code: { type: String },
          fbr_code: { type: String },
        },
      ],
      sub_total: { type: Number, required: true },

      discount: {
        type: {
          _id: { type: Types.ObjectId, ref: 'DiscountType' },
          percentage: { type: Number },
          value: { type: Number },
        },
        default: {
          percentage: 0,
          value: 0,
        },
      },

      // ✅ Tax as object with two string values
      tax: {
        type: {
          percentage: { type: String, default: '0' },
          value: { type: String, default: '0' },
        },
        default: {
          percentage: '0',
          value: '0',
        },
      },

      grand_total: { type: Number, required: true },
    },
    required: true,
  })
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


  // ================= FBR FLAGS =================
  @Prop({ type: Boolean, default: false })
  sendToFBR: boolean;

  @Prop({
    type: {
      invoiceNumber: { type: String },
      dated: { type: String },
      validationResponse: { type: Object },
    },
    default: null,
  })
  fbr_response: any;

  @Prop({ type: String, default: null })
  fbr_invoice_no: string;

  @Prop({
    type: String,
    enum: ['PENDING', 'SENT', 'FAILED'],
    default: 'PENDING',
  })
  fbr_status: string;

  @Prop({ type: String, default: null })
  fbr_error: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
