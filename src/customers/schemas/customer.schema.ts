import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

/* =======================
   CUSTOMER STATUS
======================= */
export enum CustomerStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

/* =======================
   FBR VERIFICATION ENUMS
======================= */
export enum FBRRegistrationType {
    REGISTERED = 'Registered',
    UNREGISTERED = 'Unregistered',
}

export enum FBRStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

/* =======================
   FBR VERIFICATION SUB-SCHEMA
======================= */
@Schema({ _id: false })
export class FbrVerification {

    @Prop({ type: String, enum: FBRRegistrationType, required: true })
    type: FBRRegistrationType;

    @Prop({ type: String, enum: FBRStatus, required: true })
    status: FBRStatus;

    @Prop({ type: Date, default: Date.now })
    checkedOn: Date;
}

export const FbrVerificationSchema =
    SchemaFactory.createForClass(FbrVerification);

/* =======================
   CUSTOMER SCHEMA
======================= */
@Schema({ timestamps: true })
export class Customer {

    /* ========= ESSENTIAL ========= */
    @Prop({ required: true })
    customerName: string;

    @Prop({ required: true })
    customerType: string;

    @Prop({ required: true })
    cnic: string;

    @Prop({ required: true })
    billingCurrency: string;

    /* ========= OPTIONAL ========= */
    @Prop()
    customerGroup?: string;

    @Prop()
    territory?: string;

    @Prop()
    fromLead?: string;

    @Prop()
    fromOpportunity?: string;

    @Prop()
    accountManager?: string;

    @Prop()
    defaultPriceList?: string;

    @Prop()
    companyBankAccount?: string;

    /* ========= ADDRESS ========= */
    @Prop()
    addressTitle?: string;

    @Prop()
    addressType?: string;

    @Prop()
    addressLine1?: string;

    @Prop()
    addressLine2?: string;

    @Prop()
    city?: string;

    @Prop()
    countyDistrict?: string;

    @Prop()
    provinceState?: string;

    @Prop({ default: "0" })
    provinceCode?: string;

    @Prop()
    country?: string;

    @Prop()
    postalCode?: string;

    /* ========= CONTACT ========= */
    @Prop()
    emailAddress?: string;

    @Prop()
    phoneNumber?: string;

    @Prop()
    faxNumber?: string;

    /* ========= TAX ========= */
    @Prop()
    taxCategory?: string;

    @Prop()
    taxIdentificationNumber?: string;

    @Prop()
    taxRegistrationType?: string;

    @Prop({ type: String, default: null })
    taxExemptionCertificate: string | null;

    @Prop()
    vatNumber?: string;

    @Prop()
    defaultTaxRate?: string;

    @Prop()
    withholdingTaxApplicable?: string;

    /* ========= FINANCIAL ========= */
    @Prop()
    customerCode?: string;

    @Prop()
    defaultReceivableAccount?: string;

    @Prop()
    creditLimit?: string;

    @Prop()
    paymentTerms?: string;

    @Prop()
    agingGroup?: string;

    @Prop()
    defaultBankAccount?: string;

    @Prop()
    logoUrl?: string;

    /* ========= FBR VERIFICATION ========= */
    @Prop({ type: FbrVerificationSchema, required: false })
    fbrVerification?: FbrVerification;

    /* ========= MISC ========= */
    @Prop()
    notes?: string;

    @Prop({
        type: String,
        enum: CustomerStatus,
        default: CustomerStatus.ACTIVE,
    })
    status: CustomerStatus;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
