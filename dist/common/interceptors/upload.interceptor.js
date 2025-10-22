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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const multer_2 = require("multer");
let FileUploadInterceptor = class FileUploadInterceptor {
    upload;
    constructor(fieldName = 'profile') {
        this.upload = (0, multer_1.default)({
            storage: (0, multer_2.diskStorage)({
                destination: (req, file, cb) => {
                    cb(null, './uploads');
                },
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('Only image files are allowed!'), false);
                }
                cb(null, true);
            },
            limits: { fileSize: 3 * 1024 * 1024 },
        }).single(fieldName);
    }
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        return new rxjs_1.Observable((observer) => {
            this.upload(req, req.res, (err) => {
                if (err)
                    observer.error(new common_1.BadRequestException(err.message));
                else
                    observer.next(next.handle());
            });
        });
    }
};
exports.FileUploadInterceptor = FileUploadInterceptor;
exports.FileUploadInterceptor = FileUploadInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], FileUploadInterceptor);
//# sourceMappingURL=upload.interceptor.js.map