import { SalesService } from './sales.service';
import { Sale } from './schemas/sale.schema';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    create(body: Partial<Sale>): Promise<Sale>;
    getAll(): Promise<Sale[]>;
    getOne(id: string): Promise<Sale>;
    update(id: string, body: Partial<Sale>): Promise<Sale>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
