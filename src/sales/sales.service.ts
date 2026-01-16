import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from './schemas/sale.schema';


@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
  ) { }

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

 async createSale(data: Partial<Sale>, userId: string) {

    if (!data.customer_code) {
      throw new NotFoundException('customer_code is required');
    }

    const { inv_no, ref_no } = await this.generateNumbers(data.customer_code);

    data.details = data.details ?? {
      items: [],
      sub_total: 0,
      discount: { percentage: 0, value: 0 },
      tax: { percentage: '0', value: '0' }, // string as per schema
      grand_total: 0,
    };


    const sale = new this.saleModel({
      ...data,
      inv_no,
      ref_no,
      createdBy: userId,
      fbr_status: data.sendToFBR ? 'PENDING' : 'PENDING',
    });

    const savedSale = await sale.save();

    // 🔥 CONDITIONAL FBR CALL
    if (data.sendToFBR === true) {
      try {
        const fbrResult = await this.sendToFBR(savedSale.inv_no);

        const fbrInvoiceNo =
          fbrResult?.fbr_response?.validationResponse?.invoiceStatuses?.[0]?.invoiceNo || null;

        await this.saleModel.findByIdAndUpdate(savedSale._id, {
          fbr_status: 'SENT',
          fbr_invoice_no: fbrInvoiceNo,
          fbr_response: fbrResult.fbr_response,
        });

        return {
          success: true,
          sale: savedSale,
          fbr: fbrResult,
        };

      } catch (error) {
        // ❌ FBR FAILED
        await this.saleModel.findByIdAndUpdate(savedSale._id, {
          fbr_status: 'FAILED',
          fbr_error: error.message,
        });

        throw new Error(`FBR Error: ${error.message}`);
      }
    }

    // ❌ No FBR Call
    return {
      sale: savedSale,
      message: 'Sale created without FBR submission',
    };
  }


 async getAllSales(
  page: number = 1,
  limit: number = 10,
  filters?: {
    startDate?: string;
    endDate?: string;
    customer?: string;
    biller?: string;
    status?: string;
    minAmount?: string;
    maxAmount?: string;
  },
): Promise<{
  sales: Sale[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
    currentCount: number;
  };
  totals: {
    totalSalesPKR: number;
    totalInvoices: number;
    totalActiveCustomers: number;
  };
}> {
  page = Math.max(page, 1);
  limit = Math.max(limit, 1);
  const skip = (page - 1) * limit;

  // Build dynamic MongoDB filter
  const queryFilter: any = {};

  if (filters?.startDate || filters?.endDate) {
    queryFilter.createdAt = {};
    if (filters.startDate) queryFilter.createdAt.$gte = new Date(filters.startDate);
    if (filters.endDate) queryFilter.createdAt.$lte = new Date(filters.endDate);
  }

  if (filters?.customer) queryFilter.customer_id = filters.customer;
  if (filters?.biller) queryFilter.biller_id = filters.biller;
  if (filters?.status) queryFilter.status = filters.status;

  if (filters?.minAmount || filters?.maxAmount) {
    queryFilter['details.grand_total'] = {};
    if (filters.minAmount) queryFilter['details.grand_total'].$gte = parseFloat(filters.minAmount);
    if (filters.maxAmount) queryFilter['details.grand_total'].$lte = parseFloat(filters.maxAmount);
  }

  // --- Paginated sales
  const totalCount = await this.saleModel.countDocuments(queryFilter);
  const sales = await this.saleModel
    .find(queryFilter)
    .populate('customer_id')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec();

  const totalPages = Math.ceil(totalCount / limit);
  const currentCount = sales.length;

  // --- Cumulative totals based on filtered sales
  const allSales = await this.saleModel.find(queryFilter); // only filtered sales
  const totalSalesPKR = allSales.reduce(
    (acc, sale) => acc + (sale.details?.grand_total || 0),
    0,
  );
  const totalInvoices = allSales.length;

  const CustomerModel = this.saleModel.db.model('Customer');
  const totalActiveCustomers = await CustomerModel.countDocuments({ status: 'ACTIVE' });

  return {
    sales,
    pagination: {
      totalPages,
      currentPage: page,
      totalCount,
      currentCount,
    },
    totals: {
      totalSalesPKR,
      totalInvoices,
      totalActiveCustomers,
    },
  };
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
  // 🔹 Send full invoice to FBR based on inv_no
  async sendToFBR(inv_no: string) {
    if (!inv_no) {
      throw new NotFoundException('inv_no is required');
    }

    // 1️⃣ Get sale from DB
    const sale = await this.saleModel.findOne({ inv_no }).populate('customer_id').exec();
    if (!sale) {
      throw new NotFoundException('Invoice not found with given inv_no');
    }

    const buyer: any = sale.customer_id;

    // 2️⃣ Map items for FBR
    const items = sale.details.items.map(item => {
      const quantity = item.qty;
      const rate = item.rate;
      const totalValues = quantity * rate;
      const taxPercentage = parseFloat(sale.details.tax?.percentage || '0');
      const discountValue = sale.details.discount?.value || 0;


      return {
        hsCode: item.hs_code || "",
        productDescription: item.name || "",
        rate: `${taxPercentage}%`,
        uoM: item?.fbr_code || "Numbers, pieces, units",
        quantity: quantity,
        totalValues: totalValues,
        valueSalesExcludingST: totalValues,
        fixedNotifiedValueOrRetailPrice: 0.0,
        salesTaxApplicable: parseFloat(((totalValues * taxPercentage) / 100).toFixed(2)),
        salesTaxWithheldAtSource: 0.0,
        extraTax: 0.0,
        furtherTax: 0.0,
        sroScheduleNo: "",
        fedPayable: 0.0,
        discount: discountValue,
        saleType: sale.sale_type,
        sroItemSerialNo: "",
      };
    });

    // 3️⃣ Build payload for FBR
    const payload = {
      invoiceType: "Sale Invoice",
      invoiceDate: sale.issue_date,
      sellerNTNCNIC: "6575319",
      sellerBusinessName: "Future Gulf Tech Cont",
      sellerProvince: "Sindh",
      sellerAddress: "Karachi",
      buyerNTNCNIC: buyer?.cnic || "",
      buyerBusinessName: buyer?.customerName || "",
      buyerProvince: buyer?.provinceState || "",
      buyerAddress: buyer?.addressLine1 || "",
      buyerRegistrationType: buyer?.fbrVerification?.type,
      invoiceRefNo: sale.ref_no,
      scenarioId: "SN018",
      items: items,
    };

    // 4️⃣ Send to FBR API
    const apiUrl = "https://gw.fbr.gov.pk/di_data/v1/di/postinvoicedata_sb";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.FBR_POST_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      console.log(payload);


      const rawText = await response.text();
      console.log(rawText)
      let result: any;
      try {
        result = rawText ? JSON.parse(rawText) : null;
      } catch (err) {
        throw new Error(`FBR returned invalid JSON: ${rawText}`);
      }

      if (!result?.validationResponse) {
        throw new Error(`FBR response missing validationResponse: ${rawText}`);
      }

      const validation = result.validationResponse;

      // 5️⃣ Update sale document with FBR response
      const fbrInvoiceNo = validation.invoiceStatuses?.[0]?.invoiceNo || null;

      const fbrStatus = validation.statusCode === '00' ? 'SENT' : 'FAILED';
      const fbrError = validation.statusCode !== '00' ? validation.error || 'FBR validation failed' : null;

      await this.saleModel.findByIdAndUpdate(sale._id, {
        fbr_status: fbrStatus,
        fbr_invoice_no: fbrInvoiceNo,
        fbr_response: result,
        fbr_error: fbrError,
      });

      if (fbrStatus === 'FAILED') {
        throw new BadRequestException(`FBR validation failed: ${fbrError}`);
      }
      return {
        success: true,
        message: 'Invoice successfully validated by FBR',
        fbr_response: result,
      };

    } catch (err) {
      if (err instanceof BadRequestException || err instanceof NotFoundException) {
        // Let NestJS handle it properly
        throw err;
      }
      // For other unexpected errors
      throw new BadRequestException(`FBR API request failed: ${err.message}`);
    }

  }

  // 🔹 Change Sale Status
  async changeStatus(
    id: string,
    status: 'UNPAID' | 'PAID' | 'CANCELED',
  ): Promise<Sale> {
    const allowedStatuses = ['UNPAID', 'PAID', 'CANCELED'];
    if (!allowedStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid status. Allowed: ${allowedStatuses.join(', ')}`,
      );
    }

    // Fetch the sale first
    const sale = await this.saleModel.findById(id).exec();
    if (!sale) {
      throw new NotFoundException('Sale not found');
    }

    // 🔹 Check fbr_invoice_no if user tries to mark UNPAID or CANCELED
    if ((status === 'CANCELED' || status === 'UNPAID') && sale?.fbr_invoice_no) {
      throw new BadRequestException(
        `Cannot mark as ${status} because FBR invoice exists`,
      );
    }

    // Update status
    sale.status = status;
    await sale.save();

    return sale;
  }


}
