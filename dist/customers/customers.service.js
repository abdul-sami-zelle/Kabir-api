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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_schema_1 = require("./schemas/customer.schema");
const fbr_service_1 = require("../fbr/fbr.service");
let CustomersService = class CustomersService {
    customerModel;
    fbrService;
    constructor(customerModel, fbrService) {
        this.customerModel = customerModel;
        this.fbrService = fbrService;
    }
    async create(data) {
        if (data.cnic) {
            const today = new Date().toISOString().split('T')[0];
            const regType = await this.fbrService.checkRegistrationType(data.cnic);
            const status = await this.fbrService.checkActiveStatus(data.cnic, today);
            data.fbrVerification = {
                type: regType,
                status,
                checkedOn: new Date(),
            };
        }
        const customer = new this.customerModel(data);
        return customer.save();
    }
    async findAll() {
        return this.customerModel.find().exec();
    }
    async findOne(id) {
        const customer = await this.customerModel.findById(id).exec();
        if (!customer)
            throw new common_1.NotFoundException('Customer not found');
        return customer;
    }
    async update(id, data) {
        const updated = await this.customerModel
            .findByIdAndUpdate(id, data, { new: true })
            .exec();
        if (!updated)
            throw new common_1.NotFoundException('Customer not found');
        return updated;
    }
    async remove(id) {
        const result = await this.customerModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException('Customer not found');
        return { message: 'Customer deleted successfully' };
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        fbr_service_1.FbrService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map