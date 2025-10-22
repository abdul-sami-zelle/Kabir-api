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
exports.SalesSettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const discount_type_schema_1 = require("./schemas/discount-type.schema");
const tax_type_schema_1 = require("./schemas/tax-type.schema");
let SalesSettingsService = class SalesSettingsService {
    discountModel;
    taxModel;
    constructor(discountModel, taxModel) {
        this.discountModel = discountModel;
        this.taxModel = taxModel;
    }
    async generateCode(type) {
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
        }
        else {
            lastEntry = await this.discountModel.findOne().sort({ createdAt: -1 }).exec();
            if (lastEntry) {
                const lastSeq = parseInt(lastEntry.code.split('-')[3], 10);
                seq = lastSeq + 1;
            }
            return `DIS-${MM}-${YYYY}-${String(seq).padStart(4, '0')}`;
        }
    }
    async createDiscountType(data) {
        data.code = await this.generateCode('DIS');
        const discount = new this.discountModel(data);
        return discount.save();
    }
    async getDiscountTypes() {
        return this.discountModel.find().exec();
    }
    async updateDiscountType(id, data) {
        const updated = await this.discountModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updated)
            throw new common_1.NotFoundException('Discount Type not found');
        return updated;
    }
    async deleteDiscountType(id) {
        const deleted = await this.discountModel.findByIdAndDelete(id).exec();
        if (!deleted)
            throw new common_1.NotFoundException('Discount Type not found');
        return { message: 'Discount Type deleted successfully' };
    }
    async createTaxType(data) {
        data.code = await this.generateCode('TAX');
        const tax = new this.taxModel(data);
        return tax.save();
    }
    async getTaxTypes() {
        return this.taxModel.find().exec();
    }
    async updateTaxType(id, data) {
        const updated = await this.taxModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updated)
            throw new common_1.NotFoundException('Tax Type not found');
        return updated;
    }
    async deleteTaxType(id) {
        const deleted = await this.taxModel.findByIdAndDelete(id).exec();
        if (!deleted)
            throw new common_1.NotFoundException('Tax Type not found');
        return { message: 'Tax Type deleted successfully' };
    }
};
exports.SalesSettingsService = SalesSettingsService;
exports.SalesSettingsService = SalesSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(discount_type_schema_1.DiscountType.name)),
    __param(1, (0, mongoose_1.InjectModel)(tax_type_schema_1.TaxType.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SalesSettingsService);
//# sourceMappingURL=sales-setting.service.js.map