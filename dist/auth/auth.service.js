"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const nodemailer = __importStar(require("nodemailer"));
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    usersService;
    jwtService;
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(body) {
        const { email, password, username, fullName, roleId, gender, profile, dob } = body;
        if (!email || !password || !username || !fullName || !roleId || !gender) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser)
            throw new common_1.BadRequestException('Email already registered');
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.usersService.create({
            email,
            password: hashedPassword,
            username,
            fullName,
            roleId,
            gender,
            profile,
            dob
        });
        return { message: 'User registered successfully. Please login to get OTP.' };
    }
    async login(body) {
        const { username, password } = body;
        if (!username || !password) {
            throw new common_1.BadRequestException('Username and password required');
        }
        const user = await this.usersService.findByUsername(username);
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Invalid credentials');
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await this.usersService.update(user._id.toString(), {
            otp,
            otpExpires,
        });
        try {
            await this.sendOtpEmail(user.email, otp);
        }
        catch (error) {
            console.error('OTP email failed:', error.message);
        }
        return {
            message: 'OTP generated. Please verify to login.',
        };
    }
    async sendOtpEmail(email, otp) {
        const transporter = nodemailer.createTransport({
            host: 'mail.crescentcare.co',
            port: 587,
            secure: false,
            auth: {
                user: 'no-reply@crescentcare.co',
                pass: 'Swat@123@@'
            }
        });
        await transporter.sendMail({
            from: '"My App" <no-reply@crescentcare.co>',
            to: email,
            subject: 'Login OTP',
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        });
    }
    async verifyOtp(body) {
        const { username, otp } = body;
        if (!username || !otp) {
            throw new common_1.BadRequestException('Username and OTP required');
        }
        const user = await this.usersService.findByUsername(username);
        if (!user)
            throw new common_1.UnauthorizedException('Invalid username or OTP');
        if (user.otp !== otp)
            throw new common_1.UnauthorizedException('Invalid OTP');
        if (!user.otpExpires || user.otpExpires < new Date()) {
            throw new common_1.UnauthorizedException('OTP expired');
        }
        const token = this.jwtService.sign({
            sub: user._id.toString(),
            roleId: user.roleId,
        });
        await this.usersService.update(user._id.toString(), {
            otp: null,
            otpExpires: null,
            lastLoginAt: new Date(),
        });
        const { password, otp: _, otpExpires, ...safeUser } = user.toObject();
        return {
            token,
            user: safeUser,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map