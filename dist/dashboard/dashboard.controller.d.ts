import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboard(): Promise<{
        cummulative_data: {
            totalCustomers: number;
            totalInvoices: number;
            totalSales: any;
        };
        sales_graph: any[];
        recentInvoices: (import("mongoose").Document<unknown, {}, import("../sales/schemas/sale.schema").SaleDocument, {}, {}> & import("../sales/schemas/sale.schema").Sale & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        recentCustomers: (import("mongoose").Document<unknown, {}, import("../customers/schemas/customer.schema").CustomerDocument, {}, {}> & import("../customers/schemas/customer.schema").Customer & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
}
