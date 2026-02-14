import { AdminStatsService } from './admin-stats.service';
export declare class AdminStatsController {
    private readonly stats;
    constructor(stats: AdminStatsService);
    getDashboard(days?: string): Promise<{
        kpis: {
            totalRevenue: number;
            totalOrders: number;
            activeProducts: number;
            newCustomers: number;
            conversionRate: number;
            averageOrderValue: number;
        };
        salesEvolution: {
            date: string;
            total: number;
            count: number;
        }[];
        topProducts: {
            name: string;
            quantity: number;
            revenue: number;
            productId: string;
        }[];
        lowStockProducts: {
            id: string;
            name: string;
            slug: string;
            stock: number;
        }[];
        recentOrders: {
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            customerName: string;
            customerEmail: string;
            createdAt: Date;
            itemCount: number;
            total: number;
        }[];
        alerts: {
            pendingOrders: number;
            lowStockCount: number;
        };
    }>;
}
