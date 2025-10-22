import { Model } from 'mongoose';
import { Customer, CustomerDocument } from './schemas/customer.schema';
export declare class CustomersService {
    private customerModel;
    constructor(customerModel: Model<CustomerDocument>);
    create(data: any): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findOne(id: string): Promise<Customer>;
    update(id: string, data: any): Promise<Customer>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
