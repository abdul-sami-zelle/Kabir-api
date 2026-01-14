"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sale_schema_1 = require("./schemas/sale.schema");
let SalesService = class SalesService {
    saleModel;
    constructor(saleModel) {
        this.saleModel = saleModel;
    }
    async generateNumbers(customer_code) {
        const now = new Date();
        const MM = String(now.getMonth() + 1).padStart(2, '0');
        const YYYY = now.getFullYear();
        const custNumber = customer_code.split('-')[1] || '0000';
        const lastSale = await this.saleModel.findOne().sort({ createdAt: -1 }).exec();
        let seq = 1;
        if (lastSale) {
            const lastSeq = parseInt(lastSale.inv_no.split('-').pop(), 10);
            if (!isNaN(lastSeq))
                seq = lastSeq + 1;
        }
        const inv_no = `INV-${custNumber}-${MM}-${YYYY}-${String(seq).padStart(4, '0')}`;
        const ref_no = `REF-${custNumber}-${MM}-${YYYY}-${String(seq).padStart(4, '0')}`;
        return { inv_no, ref_no };
    }
    async createSale(data) {
        if (!data.customer_code) {
            throw new common_1.NotFoundException('customer_code is required');
        }
        const { inv_no, ref_no } = await this.generateNumbers(data.customer_code);
        data.details = data.details ?? {
            items: [],
            sub_total: 0,
            discount: { percentage: 0, value: 0 },
            tax: { percentage: '0', value: '0' },
            grand_total: 0,
        };
        const sale = new this.saleModel({
            ...data,
            inv_no,
            ref_no,
            fbr_status: data.sendToFBR ? 'PENDING' : 'PENDING',
        });
        const savedSale = await sale.save();
        if (data.sendToFBR === true) {
            try {
                const fbrResult = await this.sendToFBR(savedSale.inv_no);
                const fbrInvoiceNo = fbrResult?.fbr_response?.validationResponse?.invoiceStatuses?.[0]?.invoiceNo || null;
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
            }
            catch (error) {
                await this.saleModel.findByIdAndUpdate(savedSale._id, {
                    fbr_status: 'FAILED',
                    fbr_error: error.message,
                });
                throw new Error(`FBR Error: ${error.message}`);
            }
        }
        return {
            sale: savedSale,
            message: 'Sale created without FBR submission',
        };
    }
    async getAllSales(page = 1, limit = 10) {
        page = Math.max(page, 1);
        limit = Math.max(limit, 1);
        const skip = (page - 1) * limit;
        const totalCount = await this.saleModel.countDocuments();
        const sales = await this.saleModel
            .find()
            .populate('customer_id')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
        const totalPages = Math.ceil(totalCount / limit);
        const currentCount = sales.length;
        const allSales = await this.saleModel.find();
        const totalSalesPKR = allSales.reduce((acc, sale) => acc + (sale.details?.grand_total || 0), 0);
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
    async getSaleById(id) {
        const sale = await this.saleModel.findById(id).populate('customer_id').exec();
        if (!sale)
            throw new common_1.NotFoundException('Sale not found');
        return sale;
    }
    async updateSale(id, data) {
        const updated = await this.saleModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updated)
            throw new common_1.NotFoundException('Sale not found');
        return updated;
    }
    async deleteSale(id) {
        const deleted = await this.saleModel.findByIdAndDelete(id).exec();
        if (!deleted)
            throw new common_1.NotFoundException('Sale not found');
        return { message: 'Sale deleted successfully' };
    }
    async sendToFBR(inv_no) {
        if (!inv_no) {
            throw new common_1.NotFoundException('inv_no is required');
        }
        const sale = await this.saleModel.findOne({ inv_no }).populate('customer_id').exec();
        if (!sale) {
            throw new common_1.NotFoundException('Invoice not found with given inv_no');
        }
        const buyer = sale.customer_id;
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
            console.log(rawText);
            let result;
            try {
                result = rawText ? JSON.parse(rawText) : null;
            }
            catch (err) {
                throw new Error(`FBR returned invalid JSON: ${rawText}`);
            }
            if (!result?.validationResponse) {
                throw new Error(`FBR response missing validationResponse: ${rawText}`);
            }
            const validation = result.validationResponse;
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
                throw new common_1.BadRequestException(`FBR validation failed: ${fbrError}`);
            }
            return {
                success: true,
                message: 'Invoice successfully validated by FBR',
                fbr_response: result,
            };
        }
        catch (err) {
            if (err instanceof common_1.BadRequestException || err instanceof common_1.NotFoundException) {
                throw err;
            }
            throw new common_1.BadRequestException(`FBR API request failed: ${err.message}`);
        }
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sale_schema_1.Sale.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SalesService);
//# sourceMappingURL=sales.service.js.map