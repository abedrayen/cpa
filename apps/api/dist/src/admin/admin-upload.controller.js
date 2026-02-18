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
exports.AdminUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const promises_1 = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
let AdminUploadController = class AdminUploadController {
    async upload(file, req) {
        if (!file?.buffer) {
            throw new common_1.BadRequestException('No file provided');
        }
        const extMatch = file.originalname?.match(/\.[a-zA-Z0-9]+$/);
        const ext = extMatch ? extMatch[0].toLowerCase() : '';
        if (ext && !ALLOWED_EXT.includes(ext)) {
            throw new common_1.BadRequestException('Unsupported file type');
        }
        const uploadDir = process.env.UPLOAD_DIR;
        if (!uploadDir) {
            throw new common_1.BadRequestException('Upload directory not configured');
        }
        await (0, promises_1.mkdir)(uploadDir, { recursive: true });
        const hash = crypto.randomBytes(8).toString('hex');
        const safeName = (file.originalname ?? 'image')
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-') || 'image';
        const filename = `${safeName}-${hash}${ext || '.jpg'}`;
        const filepath = path.join(uploadDir, filename);
        await (0, promises_1.writeFile)(filepath, file.buffer);
        const base = process.env.API_PUBLIC_URL ?? `${req.protocol}://${req.get('host')}`;
        const url = `${base.replace(/\/$/, '')}/api/v1/uploads/${filename}`;
        return { url };
    }
};
exports.AdminUploadController = AdminUploadController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminUploadController.prototype, "upload", null);
exports.AdminUploadController = AdminUploadController = __decorate([
    (0, common_1.Controller)('admin/upload'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN)
], AdminUploadController);
//# sourceMappingURL=admin-upload.controller.js.map