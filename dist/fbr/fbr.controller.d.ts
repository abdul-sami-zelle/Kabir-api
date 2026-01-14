import { FbrService } from './fbr.service';
export declare class FbrController {
    private readonly fbrService;
    constructor(fbrService: FbrService);
    getProvinces(): Promise<any>;
    getSaleTypes(): Promise<any>;
    syncHSCodes(): Promise<{
        message: string;
        count: any;
    }>;
    getHSCodes(hS_CODE?: string, description?: string, limit?: string, skip?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/hs-codes.schema").HSCodeDocument, {}, {}> & import("./schemas/hs-codes.schema").HSCodeDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    syncUOMs(): Promise<{
        message: string;
        count: any;
    }>;
    getUOMs(uoM_ID?: number, description?: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/uom.schema").UOMDocument, {}, {}> & import("./schemas/uom.schema").UOMDocument & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getRates(): Promise<any>;
    validateInvoice(code: string): Promise<any>;
    GetTaxAmount(date: string, transactionTypeId: string, provinceCode: string): Promise<any>;
}
