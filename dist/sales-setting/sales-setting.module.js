"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesSettingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const discount_type_schema_1 = require("./schemas/discount-type.schema");
const tax_type_schema_1 = require("./schemas/tax-type.schema");
const sales_setting_service_1 = require("./sales-setting.service");
const sales_setting_controller_1 = require("./sales-setting.controller");
let SalesSettingModule = class SalesSettingModule {
};
exports.SalesSettingModule = SalesSettingModule;
exports.SalesSettingModule = SalesSettingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: discount_type_schema_1.DiscountType.name, schema: discount_type_schema_1.DiscountTypeSchema },
                { name: tax_type_schema_1.TaxType.name, schema: tax_type_schema_1.TaxTypeSchema },
            ]),
        ],
        controllers: [sales_setting_controller_1.SalesSettingsController],
        providers: [sales_setting_service_1.SalesSettingsService],
        exports: [sales_setting_service_1.SalesSettingsService],
    })
], SalesSettingModule);
//# sourceMappingURL=sales-setting.module.js.map