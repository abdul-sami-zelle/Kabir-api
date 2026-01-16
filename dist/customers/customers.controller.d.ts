import { CustomersService } from './customers.service';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(file: Express.Multer.File, body: any): Promise<import("./schemas/customer.schema").Customer>;
    findAll(): Promise<import("./schemas/customer.schema").Customer[]>;
    getPaginated(page: string, limit: string, status: string, customerName: string, customerType: string, fbrRegistrationType: string, fbrStatus: string, provinceCode: string): Promise<{
        customers: import("./schemas/customer.schema").Customer[];
        pagination: {
            totalPages: number;
            currentPage: number;
            totalCount: number;
            currentCount: number;
        };
        cummulations: {
            totalCustomers: number;
            registeredCustomers: number;
            activeCustomers: number;
            totalCompanies?: number;
            totalIndividuals?: number;
            totalVendors?: number;
        };
    }>;
    findOne(id: string): Promise<import("./schemas/customer.schema").Customer>;
    update(id: string, file: Express.Multer.File, body: any): Promise<import("./schemas/customer.schema").Customer>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
