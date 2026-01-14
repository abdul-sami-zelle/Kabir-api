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
exports.FbrService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FbrService = class FbrService {
    hsCodeModel;
    uomModel;
    constructor(hsCodeModel, uomModel) {
        this.hsCodeModel = hsCodeModel;
        this.uomModel = uomModel;
    }
    async callFBR(apiUrl) {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: { Authorization: `Bearer ${process.env.FBR_GET_API_KEY}` },
            });
            const text = await response.text();
            if (!text) {
                throw new Error('Empty response from FBR API');
            }
            try {
                return JSON.parse(text);
            }
            catch (err) {
                console.error('FBR API returned non-JSON response:', text);
                throw new Error('Invalid JSON response from FBR API');
            }
        }
        catch (error) {
            console.error('Error calling FBR API:', error.message);
            throw new Error(`FBR API request failed: ${error.message}`);
        }
    }
    async getSaleTypes() {
        return this.callFBR('https://gw.fbr.gov.pk/pdi/v1/transtypecode');
    }
    async getProvinces() {
        return this.callFBR('https://gw.fbr.gov.pk/pdi/v1/provinces');
    }
    async getUOMs() {
        return this.callFBR('https://gw.fbr.gov.pk/pdi/v1/uom');
    }
    async getHSCODES() {
        return this.callFBR('https://gw.fbr.gov.pk/pdi/v1/itemdesccode');
    }
    async getTaxRates() {
        return this.callFBR('https://gw.fbr.gov.pk/di_data/v1/get/taxrates');
    }
    async validateInvoice(qrCode) {
        const url = `https://gw.fbr.gov.pk/di_data/v1/qr/verify?data=${encodeURIComponent(qrCode)}`;
        return this.callFBR(url);
    }
    async getTaxAmount(date, transactionTypeId, provinceCode) {
        const url = `https://gw.fbr.gov.pk/pdi/v2/SaleTypeToRate?transTypeId=${transactionTypeId}&originationSupplier=${provinceCode}&date=${date}`;
        return this.callFBR(url);
    }
    async syncHSCodes() {
        const hsCodes = await this.getHSCODES();
        const bulkOps = hsCodes.map(h => ({
            updateOne: {
                filter: { hS_CODE: h.hS_CODE },
                update: { $set: h },
                upsert: true,
            },
        }));
        if (bulkOps.length)
            await this.hsCodeModel.bulkWrite(bulkOps);
        return { message: 'HS Codes synced successfully', count: bulkOps.length };
    }
    async getHSCodesFromDB(filter, limit = 100, skip = 0) {
        const query = filter || {};
        return this.hsCodeModel.find(query).limit(limit).skip(skip).sort({ hS_CODE: 1 });
    }
    async syncUOMs() {
        const uoms = await this.getUOMs();
        const bulkOps = uoms.map(u => ({
            updateOne: {
                filter: { uoM_ID: u.uoM_ID },
                update: { $set: u },
                upsert: true,
            },
        }));
        if (bulkOps.length)
            await this.uomModel.bulkWrite(bulkOps);
        return { message: 'UOMs synced successfully', count: bulkOps.length };
    }
    async getUOMsFromDB(filter) {
        const query = {};
        if (filter?.uoM_ID)
            query.uoM_ID = filter.uoM_ID;
        if (filter?.description)
            query.description = { $regex: filter.description, $options: 'i' };
        return this.uomModel.find(query);
    }
    async callFBRPost(apiUrl, payload) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.FBR_GET_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const text = await response.text();
            if (!text)
                throw new Error('Empty response from FBR API');
            return JSON.parse(text);
        }
        catch (error) {
            console.error('FBR POST API Error:', error.message);
            throw new Error(`FBR POST request failed: ${error.message}`);
        }
    }
    async checkRegistrationType(cnic) {
        const response = await this.callFBRPost('https://gw.fbr.gov.pk/dist/v1/Get_Reg_Type', { Registration_No: cnic });
        console.log(response?.REGISTRATION_TYPE, "checkRegistrationType");
        return response?.REGISTRATION_TYPE?.trim() === 'Registered'
            ? 'Registered'
            : 'Unregistered';
    }
    async checkActiveStatus(cnic, date) {
        const response = await this.callFBRPost('https://gw.fbr.gov.pk/dist/v1/statl', {
            regno: cnic,
            date,
        });
        console.log(response, "checkActiveStatus");
        return response?.status === 'Active'
            ? 'ACTIVE'
            : 'INACTIVE';
    }
};
exports.FbrService = FbrService;
exports.FbrService = FbrService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('HSCode')),
    __param(1, (0, mongoose_1.InjectModel)('UOM')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FbrService);
//# sourceMappingURL=fbr.service.js.map