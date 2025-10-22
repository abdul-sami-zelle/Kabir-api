import { CustomersService } from './customers.service';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(file: Express.Multer.File, body: any): Promise<import("./schemas/customer.schema").Customer>;
    findAll(): Promise<import("./schemas/customer.schema").Customer[]>;
    findOne(id: string): Promise<import("./schemas/customer.schema").Customer>;
    update(id: string, file: Express.Multer.File, body: any): Promise<import("./schemas/customer.schema").Customer>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
