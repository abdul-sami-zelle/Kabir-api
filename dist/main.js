"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const path_1 = require("path");
const fs_1 = require("fs");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'https://app.simplykabir.com',
        credentials: true,
    });
    app.use((0, cookie_parser_1.default)());
    const uploadPath = (0, path_1.join)(__dirname, '..', 'uploads/customers');
    if (!(0, fs_1.existsSync)(uploadPath)) {
        (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
    }
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    await app.listen(process.env.PORT);
    console.log(`🚀 Server running on: http://localhost:3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map