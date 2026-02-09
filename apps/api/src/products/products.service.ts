import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: ProductQueryDto, categorySlug?: string, forAdmin = false) {
    const { page, limit, sort = 'name', order = 'asc', search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      deletedAt: null,
      ...(forAdmin ? {} : { isActive: true }),
    };
    if (categorySlug) {
      where.category = { slug: categorySlug, deletedAt: null };
    }
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
          category: { select: { id: true, name: true, slug: true } },
          images: { orderBy: { sortOrder: 'asc' }, take: 1 },
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    const serialize = (p: (typeof items)[0]) => ({
      ...p,
      price: p.price.toString(),
      category: p.category,
    });

    return {
      data: items.map(serialize),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findById(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        category: { select: { id: true, name: true, slug: true, parent: { select: { name: true, slug: true } } },
        images: { orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return { ...product, price: product.price.toString() };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: { slug, deletedAt: null, isActive: true },
      include: {
        category: { select: { id: true, name: true, slug: true, parent: { select: { name: true, slug: true } } },
        images: { orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return {
      ...product,
      price: product.price.toString(),
    };
  }

  async findRelated(productId: string, categoryId: string, limit = 4) {
    const items = await this.prisma.product.findMany({
      where: {
        id: { not: productId },
        categoryId,
        deletedAt: null,
        isActive: true,
      },
      take: limit,
      include: {
        category: { select: { slug: true, name: true } },
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
      },
    });
    return items.map((p) => ({ ...p, price: p.price.toString() }));
  }

  async create(dto: CreateProductDto) {
    const { images, ...data } = dto;
    const product = await this.prisma.product.create({
      data: {
        ...data,
        price: new Decimal(data.price),
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
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: true,
      },
    });
    return { ...product, price: product.price.toString() };
  }

  async update(id: string, dto: UpdateProductDto) {
    const existing = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
    if (!existing) throw new NotFoundException('Product not found');
    const { images, ...data } = dto;
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
        ...data,
        price: data.price !== undefined ? new Decimal(data.price) : undefined,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { sortOrder: 'asc' } },
      },
    });
    return { ...product, price: product.price.toString() };
  }

  async remove(id: string) {
    const product = await this.prisma.product.findFirst({ where: { id, deletedAt: null } });
    if (!product) throw new NotFoundException('Product not found');
    await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return { success: true };
  }
}
