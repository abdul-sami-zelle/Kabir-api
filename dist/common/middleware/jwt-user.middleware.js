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
exports.JwtUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtUserMiddleware = class JwtUserMiddleware {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        console.log('Headers:', req.headers);
        console.log('Cookies:', req.cookies);
        let token;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        if (!token && req.cookies?.access_token) {
            token = req.cookies.access_token;
        }
        console.log('Token found:', token);
        if (!token) {
            req.userId = null;
            req.roleId = null;
            return next();
        }
        try {
            const decoded = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET,
            });
            console.log('Decoded JWT:', decoded);
            req.userId = decoded.sub;
            req.roleId = decoded.roleId;
            next();
        }
        catch (err) {
            console.error('JWT verification failed:', err.message);
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.JwtUserMiddleware = JwtUserMiddleware;
exports.JwtUserMiddleware = JwtUserMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtUserMiddleware);
//# sourceMappingURL=jwt-user.middleware.js.map