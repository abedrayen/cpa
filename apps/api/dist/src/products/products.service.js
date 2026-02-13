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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let ProductsService = class ProductsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query, forAdmin = false) {
        const { page, limit, sort = 'name', order = 'asc', search } = query;
        const skip = (page - 1) * limit;
        const where = {
            deletedAt: null,
            ...(forAdmin ? {} : { isActive: true }),
        };
        if (search?.trim()) {
            where.OR = [
                { name: { contains: search.trim(), mode: 'insensitive' } },
                { description: { contains: search.trim(), mode: 'insensitive' } },
            ];
        }
        const [items, total] = await Promise.all([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sort]: order },
                include: {
                    images: { orderBy: { sortOrder: 'asc' }, take: 1 },
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        const serialize = (p) => ({
            ...p,
            price: p.price.toString(),
        });
        return {
            data: items.map(serialize),
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findById(id) {
        const product = await this.prisma.product.findFirst({
            where: { id, deletedAt: null },
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return { ...product, price: product.price.toString() };
    }
    async findBySlug(slug) {
        const product = await this.prisma.product.findFirst({
            where: { slug, deletedAt: null, isActive: true },
            include: {
                images: { orderBy: { sortOrder: 'asc' } },
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return { ...product, price: product.price.toString() };
    }
    async findRelated(productId, limit = 4) {
        const items = await this.prisma.product.findMany({
            where: {
                id: { not: productId },
                deletedAt: null,
                isActive: true,
            },
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                images: { orderBy: { sortOrder: 'asc' }, take: 1 },
            },
        });
        return items.map((p) => ({ ...p, price: p.price.toString() }));
    }
    async create(dto) {
        const { images, specs, price, ...rest } = dto;
        const product = await this.prisma.product.create({
            data: {
                ...rest,
                price: new library_1.Decimal(price),
                specs: specs,
                images: images?.length
                    ? {
                        create: images.map((img, i) => ({
                            url: img.url,
                            alt: img.alt ?? '',
                            sortOrder: img.sortOrder ?? i,
                        })),
                    }
                    : undefined,
            },
            include: { images: true },
        });
        return { ...product, price: product.price.toString() };
    }
    async update(id, dto) {
        const existing = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
        if (!existing)
            throw new common_1.NotFoundException('Product not found');
        const { images, specs, price, ...rest } = dto;
        if (images !== undefined) {
            await this.prisma.productImage.deleteMany({ where: { productId: id } });
            if (images.length) {
                await this.prisma.productImage.createMany({
                    data: images.map((img, i) => ({
                        productId: id,
                        url: img.url,
                        alt: img.alt ?? '',
                        sortOrder: img.sortOrder ?? i,
                    })),
                });
            }
        }
        const product = await this.prisma.product.update({
            where: { id },
            data: {
                ...rest,
                specs: specs,
                price: price !== undefined ? new library_1.Decimal(price) : undefined,
            },
            include: { images: { orderBy: { sortOrder: 'asc' } } },
        });
        return { ...product, price: product.price.toString() };
    }
    async remove(id) {
        const product = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        await this.prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        return { success: true };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map