import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

export enum CustomerStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}



@Schema({ timestamps: true })
export class Customer {
    // ✅ Essential fields (required)
    @Prop({ required: true })
    customerName: string;

    @Prop({ required: true })
    customerType: string;

    // 🟡 Optional fields
    @Prop({ required: true })
    customerGroup?: string;

    @Prop({ required: true })
    cnic?: string;

    @Prop({ required: true })
    territory?: string;

    @Prop()
    fromLead?: string;

    @Prop()
    fromOpportunity?: string;

    @Prop()
    accountManager?: string;

    @Prop()
    defaultPriceList?: string;

    @Prop({ required: true })
    billingCurrency?: string;

    @Prop()
    companyBankAccount?: string;

    // 🏠 Address Information
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

    @Prop()
    country?: string;

    @Prop()
    postalCode?: string;

    // ☎️ Contact Information
    @Prop()
    emailAddress?: string;

    @Prop()
    phoneNumber?: string;

    @Prop()
    faxNumber?: string;

    // 🧾 Tax Information
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

    // 💰 Financial Information
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

    // 🗒️ Misc
    @Prop()
    notes?: string;

    @Prop({ type: String, enum: CustomerStatus, default: CustomerStatus.ACTIVE })
    status: CustomerStatus;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
