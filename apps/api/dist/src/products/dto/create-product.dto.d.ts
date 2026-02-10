export declare class ProductImageDto {
    url: string;
    alt?: string;
    sortOrder?: number;
}
export declare class CreateProductDto {
    name: string;
    slug: string;
    categoryId: string;
    description: string;
    specs?: Record<string, unknown>;
    price: number;
    isQuoteOnly?: boolean;
    stock?: number;
    isActive?: boolean;
    metaTitle?: string;
    metaDescription?: string;
    images?: ProductImageDto[];
}
