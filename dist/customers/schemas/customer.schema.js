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
exports.CustomerSchema = exports.Customer = exports.FbrVerificationSchema = exports.FbrVerification = exports.FBRStatus = exports.FBRRegistrationType = exports.CustomerStatus = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var CustomerStatus;
(function (CustomerStatus) {
    CustomerStatus["ACTIVE"] = "ACTIVE";
    CustomerStatus["INACTIVE"] = "INACTIVE";
})(CustomerStatus || (exports.CustomerStatus = CustomerStatus = {}));
var FBRRegistrationType;
(function (FBRRegistrationType) {
    FBRRegistrationType["REGISTERED"] = "Registered";
    FBRRegistrationType["UNREGISTERED"] = "Unregistered";
})(FBRRegistrationType || (exports.FBRRegistrationType = FBRRegistrationType = {}));
var FBRStatus;
(function (FBRStatus) {
    FBRStatus["ACTIVE"] = "ACTIVE";
    FBRStatus["INACTIVE"] = "INACTIVE";
})(FBRStatus || (exports.FBRStatus = FBRStatus = {}));
let FbrVerification = class FbrVerification {
    type;
    status;
    checkedOn;
};
exports.FbrVerification = FbrVerification;
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: FBRRegistrationType, required: true }),
    __metadata("design:type", String)
], FbrVerification.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: FBRStatus, required: true }),
    __metadata("design:type", String)
], FbrVerification.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], FbrVerification.prototype, "checkedOn", void 0);
exports.FbrVerification = FbrVerification = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], FbrVerification);
exports.FbrVerificationSchema = mongoose_1.SchemaFactory.createForClass(FbrVerification);
let Customer = class Customer {
    customerName;
    customerType;
    cnic;
    billingCurrency;
    customerGroup;
    territory;
    fromLead;
    fromOpportunity;
    accountManager;
    defaultPriceList;
    companyBankAccount;
    addressTitle;
    addressType;
    addressLine1;
    addressLine2;
    city;
    countyDistrict;
    provinceState;
    provinceCode;
    country;
    postalCode;
    emailAddress;
    phoneNumber;
    faxNumber;
    taxCategory;
    taxIdentificationNumber;
    taxRegistrationType;
    taxExemptionCertificate;
    vatNumber;
    defaultTaxRate;
    withholdingTaxApplicable;
    customerCode;
    defaultReceivableAccount;
    creditLimit;
    paymentTerms;
    agingGroup;
    defaultBankAccount;
    logoUrl;
    fbrVerification;
    notes;
    status;
};
exports.Customer = Customer;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Customer.prototype, "customerName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Customer.prototype, "customerType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Customer.prototype, "cnic", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Customer.prototype, "billingCurrency", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "customerGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "territory", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "fromLead", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "fromOpportunity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "accountManager", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "defaultPriceList", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "companyBankAccount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "addressTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "addressType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "addressLine1", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "addressLine2", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "countyDistrict", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "provinceState", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: "0" }),
    __metadata("design:type", String)
], Customer.prototype, "provinceCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "postalCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "emailAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "faxNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "taxCategory", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "taxIdentificationNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "taxRegistrationType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], Customer.prototype, "taxExemptionCertificate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "vatNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "defaultTaxRate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "withholdingTaxApplicable", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "customerCode", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "defaultReceivableAccount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "creditLimit", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "paymentTerms", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "agingGroup", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "defaultBankAccount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "logoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: exports.FbrVerificationSchema, required: false }),
    __metadata("design:type", FbrVerification)
], Customer.prototype, "fbrVerification", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Customer.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: CustomerStatus,
        default: CustomerStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Customer.prototype, "status", void 0);
exports.Customer = Customer = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Customer);
exports.CustomerSchema = mongoose_1.SchemaFactory.createForClass(Customer);
//# sourceMappingURL=customer.schema.js.map