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
exports.SalesSettingsController = void 0;
const common_1 = require("@nestjs/common");
const sales_setting_service_1 = require("./sales-setting.service");
let SalesSettingsController = class SalesSettingsController {
    service;
    constructor(service) {
        this.service = service;
    }
    createDiscount(data) {
        return this.service.createDiscountType(data);
    }
    getDiscounts() {
        return this.service.getDiscountTypes();
    }
    updateDiscount(id, data) {
        return this.service.updateDiscountType(id, data);
    }
    deleteDiscount(id) {
        return this.service.deleteDiscountType(id);
    }
    createTax(data) {
        return this.service.createTaxType(data);
    }
    getTaxes() {
        return this.service.getTaxTypes();
    }
    updateTax(id, data) {
        return this.service.updateTaxType(id, data);
    }
    deleteTax(id) {
        return this.service.deleteTaxType(id);
    }
};
exports.SalesSettingsController = SalesSettingsController;
__decorate([
    (0, common_1.Post)('discount-type'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SalesSettingsController.prototype, "createDiscount", null);
__decorate([
    (0, common_1.Get)('discount-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SalesSettingsController.prototype, "getDiscounts", null);
__decorate([
    (0, common_1.Put)('discount-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SalesSettingsController.prototype, "updateDiscount", null);
__decorate([
    (0, common_1.Delete)('discount-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SalesSettingsController.prototype, "deleteDiscount", null);
__decorate([
    (0, common_1.Post)('tax-type'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SalesSettingsController.prototype, "createTax", null);
__decorate([
    (0, common_1.Get)('tax-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SalesSettingsController.prototype, "getTaxes", null);
__decorate([
    (0, common_1.Put)('tax-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SalesSettingsController.prototype, "updateTax", null);
__decorate([
    (0, common_1.Delete)('tax-type/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SalesSettingsController.prototype, "deleteTax", null);
exports.SalesSettingsController = SalesSettingsController = __decorate([
    (0, common_1.Controller)('sales-settings'),
    __metadata("design:paramtypes", [sales_setting_service_1.SalesSettingsService])
], SalesSettingsController);
//# sourceMappingURL=sales-setting.controller.js.map