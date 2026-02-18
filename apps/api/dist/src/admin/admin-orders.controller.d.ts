import { OrdersService } from '../orders/orders.service';
import { UpdateOrderStatusDto } from '../orders/dto/update-order-status.dto';
import { OrderStatus } from '@prisma/client';
export declare class AdminOrdersController {
    private readonly orders;
    constructor(orders: OrdersService);
    findAll(page?: number, limit?: number, status?: OrderStatus): Promise<{
        data: {
            items: {
                unitPrice: string;
                product: {
                    id: string;
                    name: string;
                    slug: string;
                };
                id: string;
                specs: string | null;
                productId: string;
                quantity: number;
                orderId: string;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            status: import(".prisma/client").$Enums.OrderStatus;
            customerEmail: string;
            customerName: string;
            customerPhone: string | null;
            notes: string | null;
            userId: string | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        items: {
            unitPrice: string;
            product: {
                id: string;
                name: string;
                slug: string;
                description: string;
            };
            id: string;
            specs: string | null;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        customerEmail: string;
        customerName: string;
        customerPhone: string | null;
        notes: string | null;
        userId: string | null;
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<{
        items: {
            unitPrice: string;
            product: {
                id: string;
                name: string;
                slug: string;
            };
            id: string;
            specs: string | null;
            productId: string;
            quantity: number;
            orderId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        customerEmail: string;
        customerName: string;
        customerPhone: string | null;
        notes: string | null;
        userId: string | null;
    }>;
}
