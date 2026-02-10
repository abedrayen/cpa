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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoriesService = class CategoriesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findTree() {
        const roots = await this.prisma.category.findMany({
            where: { parentId: null, deletedAt: null },
            orderBy: { sortOrder: 'asc' },
            include: {
                children: {
                    where: { deletedAt: null },
                    orderBy: { sortOrder: 'asc' },
                    include: {
                        children: {
                            where: { deletedAt: null },
                            orderBy: { sortOrder: 'asc' },
                        },
                    },
                },
            },
        });
        return roots;
    }
    async findBySlug(slug) {
        const category = await this.prisma.category.findFirst({
            where: { slug, deletedAt: null },
            include: {
                parent: { select: { id: true, name: true, slug: true } },
                children: {
                    where: { deletedAt: null },
                    orderBy: { sortOrder: 'asc' },
                    select: { id: true, name: true, slug: true },
                },
            },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async create(dto) {
        return this.prisma.category.create({
            data: dto,
        });
    }
    async update(id, dto) {
        const existing = await this.prisma.category.findFirst({ where: { id, deletedAt: null } });
        if (!existing)
            throw new common_1.NotFoundException('Category not found');
        return this.prisma.category.update({ where: { id }, data: dto });
    }
    async remove(id) {
        const category = await this.prisma.category.findFirst({ where: { id, deletedAt: null } });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        await this.prisma.category.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        return { success: true };
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map