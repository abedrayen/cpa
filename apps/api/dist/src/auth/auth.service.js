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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const SALT_ROUNDS = 12;
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async register(dto) {
        const existing = await this.prisma.user.findFirst({
            where: { email: dto.email.toLowerCase(), deletedAt: null },
        });
        if (existing)
            throw new common_1.ConflictException('Email already registered');
        const passwordHash = await bcrypt.hash(dto.password, SALT_ROUNDS);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email.toLowerCase(),
                passwordHash,
                role: client_1.Role.CUSTOMER,
            },
            select: { id: true, email: true, role: true },
        });
        const tokens = await this.issueTokens(user.id, user.email);
        return { user, ...tokens };
    }
    async login(dto) {
        const user = await this.prisma.user.findFirst({
            where: { email: dto.email.toLowerCase(), deletedAt: null },
        });
        if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.issueTokens(user.id, user.email);
        return {
            user: { id: user.id, email: user.email, role: user.role },
            ...tokens,
        };
    }
    async refresh(refreshToken) {
        const stored = await this.prisma.refreshToken.findUnique({
            where: { token: refreshToken },
            include: { user: { select: { id: true, email: true, role: true } } },
        });
        if (!stored || stored.expiresAt < new Date()) {
            if (stored)
                await this.prisma.refreshToken.delete({ where: { id: stored.id } }).catch(() => { });
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        await this.prisma.refreshToken.delete({ where: { id: stored.id } });
        return this.issueTokens(stored.user.id, stored.user.email);
    }
    async issueTokens(userId, email) {
        const accessSecret = this.config.get('JWT_ACCESS_SECRET');
        const accessExpiry = this.config.get('JWT_ACCESS_EXPIRY', '15m');
        const refreshExpiry = this.config.get('JWT_REFRESH_EXPIRY', '7d');
        const accessToken = this.jwt.sign({ sub: userId, email }, { secret: accessSecret, expiresIn: accessExpiry });
        const refreshToken = (0, crypto_1.randomBytes)(48).toString('hex');
        const refreshExpiresAt = new Date();
        const days = parseInt(refreshExpiry.replace(/\D/g, '') || '7', 10);
        refreshExpiresAt.setDate(refreshExpiresAt.getDate() + days);
        await this.prisma.refreshToken.create({
            data: { token: refreshToken, userId, expiresAt: refreshExpiresAt },
        });
        return {
            accessToken,
            refreshToken,
            expiresIn: accessExpiry,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map