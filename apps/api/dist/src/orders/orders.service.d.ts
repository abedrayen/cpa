import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from '@prisma/client';
export declare class OrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateOrderDto, userId?: string): Promise<{
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
