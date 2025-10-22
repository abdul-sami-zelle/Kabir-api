import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from './schemas/sale.schema';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
  ) {}

  // 🔹 Generate Invoice and Reference Numbers using customer_code
  private async generateNumbers(customer_code: string): Promise<{ inv_no: string; ref_no: string }> {
    const now = new Date();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const YYYY = now.getFullYear();

    // Extract numeric part from customer_code (e.g., "CUST-6858" → "6858")
    const custNumber = customer_code.split('-')[1] || '0000';

    // Find last sale to increment the sequence
    const lastSale = await this.saleModel.findOne().sort({ createdAt: -1 }).exec();
    let seq = 1;

    if (lastSale) {
      const lastSeq = parseInt(lastSale.inv_no.split('-').pop()!, 10);
      if (!isNaN(lastSeq)) seq = lastSeq + 1;
    }

    // Example: INV-6858-10-2025-0001
    const inv_no = `INV-${custNumber}-${MM}-${YYYY}-${String(seq).padStart(4, '0')}`;
    const ref_no = `REF-${custNumber}-${MM}-${YYYY}-${String(seq).padStart(4, '0')}`;

    return { inv_no, ref_no };
  }

  // 🔹 Create Sale
  async createSale(data: Partial<Sale>): Promise<Sale> {
    if (!data.customer_code) {
      throw new NotFoundException('customer_code is required');
    }

    const { inv_no, ref_no } = await this.generateNumbers(data.customer_code);

    // ✅ Ensure details object exists
    data.details = data.details ?? {
      items: [],
      sub_total: 0,
      discount: null,
      tax: null,
      grand_total: 0,
    };

    // Set nulls safely
    if (!data.details.discount) data.details.discount = null;
    if (!data.details.tax) data.details.tax = null;

    const newSale = new this.saleModel({
      ...data,
      inv_no,
      ref_no,
    });

    return newSale.save();
  }

  // 🔹 Get all sales
  async getAllSales(): Promise<Sale[]> {
    return this.saleModel.find().populate('customer_id').exec();
  }

  // 🔹 Get sale by ID
  async getSaleById(id: string): Promise<Sale> {
    const sale = await this.saleModel.findById(id).populate('customer_id').exec();
    if (!sale) throw new NotFoundException('Sale not found');
    return sale;
  }

  // 🔹 Update sale
  async updateSale(id: string, data: Partial<Sale>): Promise<Sale> {
    const updated = await this.saleModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Sale not found');
    return updated;
  }

  // 🔹 Delete sale
  async deleteSale(id: string): Promise<{ message: string }> {
    const deleted = await this.saleModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Sale not found');
    return { message: 'Sale deleted successfully' };
  }
}
