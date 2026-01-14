import { Document } from 'mongoose';
export type CustomerDocument = Customer & Document;
export declare enum CustomerStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare enum FBRRegistrationType {
    REGISTERED = "Registered",
    UNREGISTERED = "Unregistered"
}
export declare enum FBRStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}
export declare class FbrVerification {
    type: FBRRegistrationType;
    status: FBRStatus;
    checkedOn: Date;
}
export declare const FbrVerificationSchema: import("mongoose").Schema<FbrVerification, import("mongoose").Model<FbrVerification, any, any, any, Document<unknown, any, FbrVerification, any, {}> & FbrVerification & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FbrVerification, Document<unknown, {}, import("mongoose").FlatRecord<FbrVerification>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<FbrVerification> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Customer {
    customerName: string;
    customerType: string;
    cnic: string;
    billingCurrency: string;
    customerGroup?: string;
    territory?: string;
    fromLead?: string;
    fromOpportunity?: string;
    accountManager?: string;
    defaultPriceList?: string;
    companyBankAccount?: string;
    addressTitle?: string;
    addressType?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    countyDistrict?: string;
    provinceState?: string;
    provinceCode?: string;
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
    fbrVerification?: FbrVerification;
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
