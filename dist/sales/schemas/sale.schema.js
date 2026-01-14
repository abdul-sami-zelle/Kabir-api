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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleSchema = exports.Sale = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Sale = class Sale {
    customer_id;
    customer_code;
    basic_info;
    inv_no;
    ref_no;
    issue_date;
    due_date;
    sale_type;
    details;
    sendToFBR;
    fbr_response;
    fbr_invoice_no;
    fbr_status;
    fbr_error;
};
exports.Sale = Sale;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Customer', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Sale.prototype, "customer_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Sale.prototype, "customer_code", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            company_status: { type: String, required: true },
            company_name: { type: String, required: true },
            company_group: { type: String, required: false },
            cnic: { type: String, required: true },
            country: { type: String, required: true },
            currency: { type: String, required: true },
        },
        required: true,
    }),
    __metadata("design:type", Object)
], Sale.prototype, "basic_info", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Sale.prototype, "inv_no", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Sale.prototype, "ref_no", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Sale.prototype, "issue_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Sale.prototype, "due_date", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Sale.prototype, "sale_type", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            items: [
                {
                    id: { type: String, required: true },
                    name: { type: String, required: true },
                    qty: { type: Number, required: true },
                    rate: { type: Number, required: true },
                    amount: { type: Number, required: true },
                    hs_code: { type: String },
                    fbr_code: { type: String },
                },
            ],
            sub_total: { type: Number, required: true },
            discount: {
                type: {
                    _id: { type: mongoose_2.Types.ObjectId, ref: 'DiscountType' },
                    percentage: { type: Number },
                    value: { type: Number },
                },
                default: {
                    percentage: 0,
                    value: 0,
                },
            },
            tax: {
                type: {
                    percentage: { type: String, default: '0' },
                    value: { type: String, default: '0' },
                },
                default: {
                    percentage: '0',
                    value: '0',
                },
            },
            grand_total: { type: Number, required: true },
        },
        required: true,
    }),
    __metadata("design:type", Object)
], Sale.prototype, "details", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Sale.prototype, "sendToFBR", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            invoiceNumber: { type: String },
            dated: { type: String },
            validationResponse: { type: Object },
        },
        default: null,
    }),
    __metadata("design:type", Object)
], Sale.prototype, "fbr_response", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Sale.prototype, "fbr_invoice_no", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['PENDING', 'SENT', 'FAILED'],
        default: 'PENDING',
    }),
    __metadata("design:type", String)
], Sale.prototype, "fbr_status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", String)
], Sale.prototype, "fbr_error", void 0);
exports.Sale = Sale = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Sale);
exports.SaleSchema = mongoose_1.SchemaFactory.createForClass(Sale);
//# sourceMappingURL=sale.schema.js.map