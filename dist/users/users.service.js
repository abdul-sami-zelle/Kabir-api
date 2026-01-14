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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(body) {
        if (!body.email || !body.password || !body.username || !body.fullName || !body.roleId || !body.gender) {
            throw new common_1.BadRequestException(`Missing required fields ${body.gender}`);
        }
        const emailExists = await this.userModel.findOne({ email: body.email });
        if (emailExists)
            throw new common_1.BadRequestException('Email already exists');
        const usernameExists = await this.userModel.findOne({ username: body.username });
        if (usernameExists)
            throw new common_1.BadRequestException('Username already exists');
        return this.userModel.create({
            email: body.email,
            password: body.password,
            username: body.username,
            fullName: body.fullName,
            gender: body.gender,
            dob: body.dob,
            profile: body.profile,
            roleId: body.roleId,
            otp: body.otp || null,
            otpExpires: body.otpExpires || null,
        });
    }
    findById(id) {
        return this.userModel.findById(id).select('-password -otp');
    }
    findByEmail(email) {
        return this.userModel.findOne({ email });
    }
    findByUsername(username) {
        return this.userModel.findOne({ username });
    }
    update(id, body) {
        return this.userModel.findByIdAndUpdate(id, body, { new: true });
    }
    updateLastLogin(id) {
        return this.userModel.findByIdAndUpdate(id, { lastLoginAt: new Date() }, { new: true });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map