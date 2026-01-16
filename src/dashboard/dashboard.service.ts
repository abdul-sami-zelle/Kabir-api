import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer, CustomerDocument } from '../customers/schemas/customer.schema';
import { Sale, SaleDocument } from '../sales/schemas/sale.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
  ) {}

  async getDashboardData() {
    // -------------------- CUMMULATIVE DATA --------------------
    const totalCustomers = await this.customerModel.countDocuments();
    const totalInvoices = await this.saleModel.countDocuments();
    const totalSalesAgg = await this.saleModel.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$details.grand_total' },
        },
      },
    ]);
    const totalSales = totalSalesAgg[0]?.totalSales || 0;

    // -------------------- SALES GRAPH --------------------
    const salesGraph = await this.saleModel.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: { $toDate: '$issue_date' } },
          },
          totalSale: { $sum: '$details.grand_total' },
          totalInvoices: { $sum: 1 },
          totalTax: { $sum: { $toDouble: '$details.tax.value' } },
          totalDiscount: { $sum: { $toDouble: '$details.discount.value' } },
        },
      },
      { $sort: { '_id': 1 } },
      {
        $project: {
          date: '$_id',
          totalSale: 1,
          totalInvoices: 1,
          totalTax: 1,
          totalDiscount: 1,
          _id: 0,
        },
      },
    ]);

    // -------------------- RECENT INVOICES --------------------
    const recentInvoices = await this.saleModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('inv_no customer_code details.grand_total issue_date status');

    // -------------------- RECENT CUSTOMERS --------------------
    const recentCustomers = await this.customerModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('customerName customerCode createdAt status logoUrl _id');

    return {
      cummulative_data: { totalCustomers, totalInvoices, totalSales },
      sales_graph: salesGraph,
      recentInvoices,
      recentCustomers,
    };
  }
}
