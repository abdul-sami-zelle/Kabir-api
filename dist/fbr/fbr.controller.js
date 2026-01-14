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
exports.FbrController = void 0;
const common_1 = require("@nestjs/common");
const fbr_service_1 = require("./fbr.service");
let FbrController = class FbrController {
    fbrService;
    constructor(fbrService) {
        this.fbrService = fbrService;
    }
    getProvinces() {
        return this.fbrService.getProvinces();
    }
    getSaleTypes() {
        return this.fbrService.getSaleTypes();
    }
    syncHSCodes() {
        return this.fbrService.syncHSCodes();
    }
    async getHSCodes(hS_CODE, description, limit, skip) {
        const filter = {};
        if (hS_CODE)
            filter.hS_CODE = { $regex: hS_CODE, $options: 'i' };
        if (description)
            filter.description = { $regex: description, $options: 'i' };
        const maxLimit = parseInt(limit) || 100;
        const offset = parseInt(skip) || 0;
        return this.fbrService.getHSCodesFromDB(filter, maxLimit, offset);
    }
    syncUOMs() {
        return this.fbrService.syncUOMs();
    }
    getUOMs(uoM_ID, description) {
        return this.fbrService.getUOMsFromDB({ uoM_ID, description });
    }
    getRates() {
        return this.fbrService.getTaxRates();
    }
    validateInvoice(code) {
        return this.fbrService.validateInvoice(code);
    }
    GetTaxAmount(date, transactionTypeId, provinceCode) {
        return this.fbrService.getTaxAmount(date, transactionTypeId, provinceCode);
    }
};
exports.FbrController = FbrController;
__decorate([
    (0, common_1.Get)('provinces'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FbrController.prototype, "getProvinces", null);
__decorate([
    (0, common_1.Get)('sale-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FbrController.prototype, "getSaleTypes", null);
__decorate([
    (0, common_1.Post)('hs-codes/sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FbrController.prototype, "syncHSCodes", null);
__decorate([
    (0, common_1.Get)('hs-codes'),
    __param(0, (0, common_1.Query)('hS_CODE')),
    __param(1, (0, common_1.Query)('description')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('skip')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], FbrController.prototype, "getHSCodes", null);
__decorate([
    (0, common_1.Post)('uoms/sync'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FbrController.prototype, "syncUOMs", null);
__decorate([
    (0, common_1.Get)('uoms'),
    __param(0, (0, common_1.Query)('uoM_ID')),
    __param(1, (0, common_1.Query)('description')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], FbrController.prototype, "getUOMs", null);
__decorate([
    (0, common_1.Get)('tax-rates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FbrController.prototype, "getRates", null);
__decorate([
    (0, common_1.Get)('validate-invoice'),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FbrController.prototype, "validateInvoice", null);
__decorate([
    (0, common_1.Get)('get-tax'),
    __param(0, (0, common_1.Query)('date')),
    __param(1, (0, common_1.Query)('transactionTypeId')),
    __param(2, (0, common_1.Query)('provinceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], FbrController.prototype, "GetTaxAmount", null);
exports.FbrController = FbrController = __decorate([
    (0, common_1.Controller)('fbr'),
    __metadata("design:paramtypes", [fbr_service_1.FbrService])
], FbrController);
//# sourceMappingURL=fbr.controller.js.map