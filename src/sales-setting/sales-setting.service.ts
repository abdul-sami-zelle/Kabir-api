import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiscountType, DiscountTypeDocument } from './schemas/discount-type.schema';
import { TaxType, TaxTypeDocument } from './schemas/tax-type.schema';

@Injectable()
export class SalesSettingsService {
  constructor(
    @InjectModel(DiscountType.name) private discountModel: Model<DiscountTypeDocument>,
    @InjectModel(TaxType.name) private taxModel: Model<TaxTypeDocument>,
  ) {}

  // --- Helper to generate code ---
  private async generateCode(type: 'TAX' | 'DIS'): Promise<string> {
    const now = new Date();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const YYYY = now.getFullYear();

    let lastEntry;
    let seq = 1;

    if (type === 'TAX') {
      lastEntry = await this.taxModel.findOne().sort({ createdAt: -1 }).exec();
      if (lastEntry) {
        const lastSeq = parseInt(lastEntry.code.split('-')[3], 10);
        seq = lastSeq + 1;
      }
      return `TAX-${MM}-${YYYY}-${String(seq).padStart(4, '0')}`;
    } else {
      lastEntry = await this.discountModel.findOne().sort({ createdAt: -1 }).exec();
      if (lastEntry) {
        const lastSeq = parseInt(lastEntry.code.split('-')[3], 10);
        seq = lastSeq + 1;
      }
      return `DIS-${MM}-${YYYY}-${String(seq).padStart(4, '0')}`;
    }
  }

  // --- DiscountType CRUD ---
  async createDiscountType(data: Partial<DiscountType>): Promise<DiscountType> {
    data.code = await this.generateCode('DIS');
    const discount = new this.discountModel(data);
    return discount.save();
  }

  async getDiscountTypes(): Promise<DiscountType[]> {
    return this.discountModel.find().exec();
  }

  async updateDiscountType(id: string, data: Partial<DiscountType>): Promise<DiscountType> {
    const updated = await this.discountModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Discount Type not found');
    return updated;
  }

  async deleteDiscountType(id: string): Promise<{ message: string }> {
    const deleted = await this.discountModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Discount Type not found');
    return { message: 'Discount Type deleted successfully' };
  }

  // --- TaxType CRUD ---
  async createTaxType(data: Partial<TaxType>): Promise<TaxType> {
    data.code = await this.generateCode('TAX');
    const tax = new this.taxModel(data);
    return tax.save();
  }

  async getTaxTypes(): Promise<TaxType[]> {
    return this.taxModel.find().exec();
  }

  async updateTaxType(id: string, data: Partial<TaxType>): Promise<TaxType> {
    const updated = await this.taxModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Tax Type not found');
    return updated;
  }

  async deleteTaxType(id: string): Promise<{ message: string }> {
    const deleted = await this.taxModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Tax Type not found');
    return { message: 'Tax Type deleted successfully' };
  }
}
