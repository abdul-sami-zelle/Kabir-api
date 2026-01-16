import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { FbrService } from 'src/fbr/fbr.service';
export declare class CustomersService {
    private customerModel;
    private readonly fbrService;
    constructor(customerModel: Model<CustomerDocument>, fbrService: FbrService);
    create(data: any): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findOne(id: string): Promise<Customer>;
    update(id: string, data: any): Promise<Customer>;
    remove(id: string): Promise<{
        message: string;
    }>;
    findAllPaginated(page?: number, limit?: number, filters?: {
        status?: string;
        customerName?: string;
        customerType?: string;
        fbrRegistrationType?: string;
        fbrStatus?: string;
        provinceCode?: string;
    }): Promise<{
        customers: Customer[];
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
}
