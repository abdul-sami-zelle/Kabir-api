import { Model } from 'mongoose';
import { Sale, SaleDocument } from './schemas/sale.schema';
export declare class SalesService {
    private saleModel;
    constructor(saleModel: Model<SaleDocument>);
    private generateNumbers;
    createSale(data: Partial<Sale>): Promise<{
        success: boolean;
        sale: import("mongoose").Document<unknown, {}, SaleDocument, {}, {}> & Sale & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
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
        sale: import("mongoose").Document<unknown, {}, SaleDocument, {}, {}> & Sale & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
        message: string;
        success?: undefined;
        fbr?: undefined;
    }>;
    getAllSales(page?: number, limit?: number): Promise<{
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
    getSaleById(id: string): Promise<Sale>;
    updateSale(id: string, data: Partial<Sale>): Promise<Sale>;
    deleteSale(id: string): Promise<{
        message: string;
    }>;
    sendToFBR(inv_no: string): Promise<{
        success: boolean;
        message: string;
        fbr_response: any;
    }>;
}
