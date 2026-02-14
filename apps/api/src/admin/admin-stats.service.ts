import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

const LOW_STOCK_THRESHOLD = 5;
const SALES_DAYS = 30;
const TOP_PRODUCTS_LIMIT = 10;
const RECENT_ORDERS_LIMIT = 10;

@Injectable()
export class AdminStatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard(days: number = SALES_DAYS) {
    const since = new Date();
    since.setDate(since.getDate() - days);
    since.setHours(0, 0, 0, 0);

    const [
      totalOrdersCount,
      completedOrdersCount,
      activeProductsCount,
      ordersWithItems,
      lowStockProducts,
      recentOrders,
    ] = await Promise.all([
      this.prisma.order.count({ where: { deletedAt: null } }),
      this.prisma.order.count({
        where: { status: OrderStatus.COMPLETED, deletedAt: null },
      }),
      this.prisma.product.count({
        where: { isActive: true, deletedAt: null },
      }),
      this.prisma.order.findMany({
        where: { deletedAt: null, createdAt: { gte: since } },
        include: {
          items: {
            include: {
              product: { select: { id: true, name: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.findMany({
        where: {
          deletedAt: null,
          isActive: true,
          stock: { lte: LOW_STOCK_THRESHOLD },
        },
        select: { id: true, name: true, slug: true, stock: true },
        orderBy: { stock: 'asc' },
        take: 20,
      }),
      this.prisma.order.findMany({
        where: { deletedAt: null },
        include: {
          items: {
            include: {
              product: { select: { name: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: RECENT_ORDERS_LIMIT,
      }),
    ]);

    const revenueFromCompleted = await this.prisma.order.findMany({
      where: { status: OrderStatus.COMPLETED, deletedAt: null },
      select: {
        items: {
          select: {
            quantity: true,
            unitPrice: true,
          },
        },
      },
    });
    let totalRevenue = 0;
    for (const o of revenueFromCompleted) {
      for (const i of o.items) {
        totalRevenue += i.quantity * Number(i.unitPrice);
      }
    }

    const uniqueEmailsLast30 = await this.prisma.order.findMany({
      where: { createdAt: { gte: since }, deletedAt: null },
      select: { customerEmail: true },
    });
    const uniqueCustomers = new Set(uniqueEmailsLast30.map((o) => o.customerEmail)).size;

    const avgOrderValue =
      completedOrdersCount > 0 ? totalRevenue / completedOrdersCount : 0;

    const salesByDay = new Map<string, { total: number; count: number }>();
    for (let d = 0; d < days; d++) {
      const date = new Date(since);
      date.setDate(date.getDate() + d);
      const key = date.toISOString().slice(0, 10);
      salesByDay.set(key, { total: 0, count: 0 });
    }
    for (const order of ordersWithItems) {
      const key = order.createdAt.toISOString().slice(0, 10);
      if (!salesByDay.has(key)) continue;
      const entry = salesByDay.get(key)!;
      entry.count += 1;
      for (const item of order.items) {
        entry.total += item.quantity * Number(item.unitPrice);
      }
    }
    const salesEvolution = Array.from(salesByDay.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, { total, count }]) => ({ date, total: Math.round(total * 100) / 100, count }));

    const productSales = new Map<
      string,
      { name: string; quantity: number; revenue: number }
    >();
    for (const order of ordersWithItems) {
      if (order.status !== OrderStatus.COMPLETED) continue;
      for (const item of order.items) {
        const name = item.product.name;
        const rev = item.quantity * Number(item.unitPrice);
        const cur = productSales.get(item.productId) ?? {
          name,
          quantity: 0,
          revenue: 0,
        };
        cur.quantity += item.quantity;
        cur.revenue += rev;
        productSales.set(item.productId, cur);
      }
    }
    const topProducts = Array.from(productSales.entries())
      .map(([productId, v]) => ({ productId, ...v }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, TOP_PRODUCTS_LIMIT);

    const pendingOrdersCount = await this.prisma.order.count({
      where: { status: OrderStatus.PENDING, deletedAt: null },
    });

    return {
      kpis: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalOrders: totalOrdersCount,
        activeProducts: activeProductsCount,
        newCustomers: uniqueCustomers,
        conversionRate:
          totalOrdersCount > 0
            ? Math.round((completedOrdersCount / totalOrdersCount) * 10000) / 100
            : 0,
        averageOrderValue: Math.round(avgOrderValue * 100) / 100,
      },
      salesEvolution,
      topProducts,
      lowStockProducts: lowStockProducts.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        stock: p.stock,
      })),
      recentOrders: recentOrders.map((o) => ({
        id: o.id,
        status: o.status,
        customerName: o.customerName,
        customerEmail: o.customerEmail,
        createdAt: o.createdAt,
        itemCount: o.items.length,
        total: o.items.reduce(
          (s, i) => s + i.quantity * Number(i.unitPrice),
          0,
        ),
      })),
      alerts: {
        pendingOrders: pendingOrdersCount,
        lowStockCount: lowStockProducts.length,
      },
    };
  }
}
