import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../customers/schemas/customer.schema';
import { Sale, SaleDocument } from '../sales/schemas/sale.schema';
export declare class DashboardService {
    private customerModel;
    private saleModel;
    constructor(customerModel: Model<CustomerDocument>, saleModel: Model<SaleDocument>);
    getDashboardData(): Promise<{
        cummulative_data: {
            totalCustomers: number;
            totalInvoices: number;
            totalSales: any;
        };
        sales_graph: any[];
        recentInvoices: (import("mongoose").Document<unknown, {}, SaleDocument, {}, {}> & Sale & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        recentCustomers: (import("mongoose").Document<unknown, {}, CustomerDocument, {}, {}> & Customer & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
}
