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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const customer_schema_1 = require("../customers/schemas/customer.schema");
const sale_schema_1 = require("../sales/schemas/sale.schema");
let DashboardService = class DashboardService {
    customerModel;
    saleModel;
    constructor(customerModel, saleModel) {
        this.customerModel = customerModel;
        this.saleModel = saleModel;
    }
    async getDashboardData() {
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
        const recentInvoices = await this.saleModel
            .find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('inv_no customer_code details.grand_total issue_date status');
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __param(1, (0, mongoose_1.InjectModel)(sale_schema_1.Sale.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map