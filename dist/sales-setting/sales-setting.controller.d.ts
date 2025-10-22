import { SalesSettingsService } from './sales-setting.service';
import { DiscountType } from './schemas/discount-type.schema';
import { TaxType } from './schemas/tax-type.schema';
export declare class SalesSettingsController {
    private readonly service;
    constructor(service: SalesSettingsService);
    createDiscount(data: Partial<DiscountType>): Promise<DiscountType>;
    getDiscounts(): Promise<DiscountType[]>;
    updateDiscount(id: string, data: Partial<DiscountType>): Promise<DiscountType>;
    deleteDiscount(id: string): Promise<{
        message: string;
    }>;
    createTax(data: Partial<TaxType>): Promise<TaxType>;
    getTaxes(): Promise<TaxType[]>;
    updateTax(id: string, data: Partial<TaxType>): Promise<TaxType>;
    deleteTax(id: string): Promise<{
        message: string;
    }>;
}
