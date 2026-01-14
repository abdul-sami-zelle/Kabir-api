import { Model } from 'mongoose';
import { HSCodeDocument } from './schemas/hs-codes.schema';
import { UOMDocument } from './schemas/uom.schema';
export declare class FbrService {
    private hsCodeModel;
    private uomModel;
    constructor(hsCodeModel: Model<HSCodeDocument>, uomModel: Model<UOMDocument>);
    private callFBR;
    getSaleTypes(): Promise<any>;
    getProvinces(): Promise<any>;
    getUOMs(): Promise<any>;
    getHSCODES(): Promise<any>;
    getTaxRates(): Promise<any>;
    validateInvoice(qrCode: string): Promise<any>;
    getTaxAmount(date: string, transactionTypeId: string, provinceCode: string): Promise<any>;
    syncHSCodes(): Promise<{
        message: string;
        count: any;
    }>;
    getHSCodesFromDB(filter?: {
        hS_CODE?: string;
        description?: string;
    }, limit?: number, skip?: number): Promise<(import("mongoose").Document<unknown, {}, HSCodeDocument, {}, {}> & HSCodeDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    syncUOMs(): Promise<{
        message: string;
        count: any;
    }>;
    getUOMsFromDB(filter?: {
        uoM_ID?: number;
        description?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, UOMDocument, {}, {}> & UOMDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    private callFBRPost;
    checkRegistrationType(cnic: string): Promise<'Registered' | 'Unregistered'>;
    checkActiveStatus(cnic: string, date: string): Promise<'ACTIVE' | 'INACTIVE'>;
}
