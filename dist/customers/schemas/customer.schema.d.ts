import { Document } from 'mongoose';
export type CustomerDocument = Customer & Document;
export declare enum CustomerStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class Customer {
    customerName: string;
    customerType: string;
    customerGroup?: string;
    cnic?: string;
    territory?: string;
    fromLead?: string;
    fromOpportunity?: string;
    accountManager?: string;
    defaultPriceList?: string;
    billingCurrency?: string;
    companyBankAccount?: string;
    addressTitle?: string;
    addressType?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    countyDistrict?: string;
    provinceState?: string;
    country?: string;
    postalCode?: string;
    emailAddress?: string;
    phoneNumber?: string;
    faxNumber?: string;
    taxCategory?: string;
    taxIdentificationNumber?: string;
    taxRegistrationType?: string;
    taxExemptionCertificate: string | null;
    vatNumber?: string;
    defaultTaxRate?: string;
    withholdingTaxApplicable?: string;
    customerCode?: string;
    defaultReceivableAccount?: string;
    creditLimit?: string;
    paymentTerms?: string;
    agingGroup?: string;
    defaultBankAccount?: string;
    logoUrl?: string;
    notes?: string;
    status: CustomerStatus;
}
export declare const CustomerSchema: import("mongoose").Schema<Customer, import("mongoose").Model<Customer, any, any, any, Document<unknown, any, Customer, any, {}> & Customer & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Customer, Document<unknown, {}, import("mongoose").FlatRecord<Customer>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Customer> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
