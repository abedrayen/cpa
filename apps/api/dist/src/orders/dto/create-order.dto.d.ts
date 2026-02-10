export declare class OrderItemDto {
    productId: string;
    quantity: number;
    specs?: string;
}
export declare class CreateOrderDto {
    customerEmail: string;
    customerName: string;
    customerPhone?: string;
    notes?: string;
    items: OrderItemDto[];
}
