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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId) {
        if (!dto.items?.length)
            throw new common_1.BadRequestException('At least one item is required');
        const productIds = dto.items.map((i) => i.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds }, deletedAt: null },
        });
        if (products.length !== productIds.length) {
            throw new common_1.BadRequestException('One or more products not found');
        }
        const productMap = new Map(products.map((p) => [p.id, p]));
        const orderItems = dto.items.map((item) => {
            const product = productMap.get(item.productId);
            return {
                productId: product.id,
                quantity: item.quantity,
                unitPrice: product.price,
                specs: item.specs ?? null,
            };
        });
        const order = await this.prisma.order.create({
            data: {
                userId: userId ?? null,
                customerEmail: dto.customerEmail,
                customerName: dto.customerName,
                customerPhone: dto.customerPhone ?? null,
                notes: dto.notes ?? null,
                status: client_1.OrderStatus.PENDING,
                items: { create: orderItems },
            },
            include: {
                items: {
                    include: { product: { select: { id: true, name: true, slug: true } } },
                },
            },
        });
        const serializeItem = (i) => ({
            ...i,
            unitPrice: i.unitPrice.toString(),
        });
        return {
            ...order,
            items: order.items.map(serializeItem),
        };
    }
    async findAll(page = 1, limit = 20, status) {
        const skip = (page - 1) * limit;
        const where = status ? { status, deletedAt: null } : { deletedAt: null };
        const [orders, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    items: {
                        include: { product: { select: { id: true, name: true, slug: true } } },
                    },
                },
            }),
            this.prisma.order.count({ where }),
        ]);
        const serialize = (o) => ({
            ...o,
            items: o.items.map((i) => ({ ...i, unitPrice: i.unitPrice.toString() })),
        });
        return {
            data: orders.map(serialize),
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findOne(id) {
        const order = await this.prisma.order.findFirst({
            where: { id, deletedAt: null },
            include: {
                items: {
                    include: { product: { select: { id: true, name: true, slug: true, description: true } } },
                },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return {
            ...order,
            items: order.items.map((i) => ({ ...i, unitPrice: i.unitPrice.toString() })),
        };
    }
    async updateStatus(id, dto) {
        const order = await this.prisma.order.findFirst({ where: { id, deletedAt: null } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const updated = await this.prisma.order.update({
            where: { id },
            data: { status: dto.status },
            include: {
                items: {
                    include: { product: { select: { id: true, name: true, slug: true } } },
                },
            },
        });
        return {
            ...updated,
            items: updated.items.map((i) => ({ ...i, unitPrice: i.unitPrice.toString() })),
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map