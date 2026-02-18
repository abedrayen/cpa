import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly orders;
    constructor(orders: OrdersService);
    create(dto: CreateOrderDto): Promise<{
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
