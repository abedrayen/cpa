import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateOrderDto, userId?: string) {
    if (!dto.items?.length) throw new BadRequestException('At least one item is required');
    const productIds = dto.items.map((i) => i.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds }, deletedAt: null },
    });
    if (products.length !== productIds.length) {
      throw new BadRequestException('One or more products not found');
    }
    const productMap = new Map(products.map((p) => [p.id, p]));

    const orderItems = dto.items.map((item) => {
      const product = productMap.get(item.productId)!;
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
        status: OrderStatus.PENDING,
        items: { create: orderItems },
      },
      include: {
        items: {
          include: { product: { select: { id: true, name: true, slug: true } } },
        },
      },
    });

    const serializeItem = (i: (typeof order.items)[0]) => ({
      ...i,
      unitPrice: i.unitPrice.toString(),
    });
    return {
      ...order,
      items: order.items.map(serializeItem),
    };
  }

  async findAll(page = 1, limit = 20, status?: OrderStatus) {
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
    const serialize = (o: (typeof orders)[0]) => ({
      ...o,
      items: o.items.map((i) => ({ ...i, unitPrice: i.unitPrice.toString() })),
    });
    return {
      data: orders.map(serialize),
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findFirst({
      where: { id, deletedAt: null },
      include: {
        items: {
          include: { product: { select: { id: true, name: true, slug: true, description: true } } },
        },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    return {
      ...order,
      items: order.items.map((i) => ({ ...i, unitPrice: i.unitPrice.toString() })),
    };
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findFirst({ where: { id, deletedAt: null } });
    if (!order) throw new NotFoundException('Order not found');
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
}
