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
            discount: null,
            tax: null,
            grand_total: 0,
        };
        if (!data.details.discount)
            data.details.discount = null;
        if (!data.details.tax)
            data.details.tax = null;
        const newSale = new this.saleModel({
            ...data,
            inv_no,
            ref_no,
        });
        return newSale.save();
    }
    async getAllSales() {
        return this.saleModel.find().populate('customer_id').exec();
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
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sale_schema_1.Sale.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SalesService);
//# sourceMappingURL=sales.service.js.map