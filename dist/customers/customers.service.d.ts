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
}
