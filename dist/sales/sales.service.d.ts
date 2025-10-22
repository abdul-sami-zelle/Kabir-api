import { Model } from 'mongoose';
import { Sale, SaleDocument } from './schemas/sale.schema';
export declare class SalesService {
    private saleModel;
    constructor(saleModel: Model<SaleDocument>);
    private generateNumbers;
    createSale(data: Partial<Sale>): Promise<Sale>;
    getAllSales(): Promise<Sale[]>;
    getSaleById(id: string): Promise<Sale>;
    updateSale(id: string, data: Partial<Sale>): Promise<Sale>;
    deleteSale(id: string): Promise<{
        message: string;
    }>;
}
