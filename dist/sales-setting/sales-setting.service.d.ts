import { Model } from 'mongoose';
import { DiscountType, DiscountTypeDocument } from './schemas/discount-type.schema';
import { TaxType, TaxTypeDocument } from './schemas/tax-type.schema';
export declare class SalesSettingsService {
    private discountModel;
    private taxModel;
    constructor(discountModel: Model<DiscountTypeDocument>, taxModel: Model<TaxTypeDocument>);
    private generateCode;
    createDiscountType(data: Partial<DiscountType>): Promise<DiscountType>;
    getDiscountTypes(): Promise<DiscountType[]>;
    updateDiscountType(id: string, data: Partial<DiscountType>): Promise<DiscountType>;
    deleteDiscountType(id: string): Promise<{
        message: string;
    }>;
    createTaxType(data: Partial<TaxType>): Promise<TaxType>;
    getTaxTypes(): Promise<TaxType[]>;
    updateTaxType(id: string, data: Partial<TaxType>): Promise<TaxType>;
    deleteTaxType(id: string): Promise<{
        message: string;
    }>;
}
