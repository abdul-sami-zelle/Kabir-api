import { SalesService } from './sales.service';
import { Sale } from './schemas/sale.schema';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(body: Partial<Sale>): Promise<{
        success: boolean;
        sale: import("mongoose").Document<unknown, {}, import("./schemas/sale.schema").SaleDocument, {}, {}> & Sale & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        fbr: {
            success: boolean;
            message: string;
            fbr_response: any;
        };
        message?: undefined;
    } | {
        sale: import("mongoose").Document<unknown, {}, import("./schemas/sale.schema").SaleDocument, {}, {}> & Sale & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        message: string;
        success?: undefined;
        fbr?: undefined;
    }>;
    getAll(page?: string, limit?: string): Promise<{
        sales: Sale[];
        pagination: {
            totalPages: number;
            currentPage: number;
            totalCount: number;
            currentCount: number;
        };
        totals: {
            totalSalesPKR: number;
            totalInvoices: number;
            totalActiveCustomers: number;
        };
    }>;
    getOne(id: string): Promise<Sale>;
    update(id: string, body: Partial<Sale>): Promise<Sale>;
    delete(id: string): Promise<{
        message: string;
    }>;
    sendToFBR(body: {
        inv_no: string;
    }): Promise<{
        success: boolean;
        message: string;
        fbr_response: any;
    }>;
}
