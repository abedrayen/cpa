"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const UPLOAD_DIR = process.env.UPLOAD_DIR ?? (0, path_1.join)(process.cwd(), 'uploads');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets(UPLOAD_DIR, { prefix: '/uploads/' });
    app.enableCors({
        origin: process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) ?? [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'https://comptoirpro.shop',
        ],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new logging_interceptor_1.LoggingInterceptor());
    const port = process.env.PORT ?? 3001;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map