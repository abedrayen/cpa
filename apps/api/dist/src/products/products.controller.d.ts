import { ProductsService } from './products.service';
import { ProductQueryDto } from './dto/product-query.dto';
export declare class ProductsController {
    private readonly products;
    constructor(products: ProductsService);
    findAll(query: ProductQueryDto): Promise<{
        data: {
            price: string;
            images: {
                id: string;
                sortOrder: number;
                productId: string;
                url: string;
                alt: string;
            }[];
            id: string;
            name: string;
            slug: string;
            description: string;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            isQuoteOnly: boolean;
            stock: number;
            isActive: boolean;
            metaTitle: string | null;
            metaDescription: string | null;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findRelated(slug: string, limit?: string): Promise<{
        price: string;
        images: {
            id: string;
            sortOrder: number;
            productId: string;
            url: string;
            alt: string;
        }[];
        id: string;
        name: string;
        slug: string;
        description: string;
        specs: import("@prisma/client/runtime/library").JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[]>;
    findBySlug(slug: string): Promise<{
        price: string;
        images: {
            id: string;
            sortOrder: number;
            productId: string;
            url: string;
            alt: string;
        }[];
        id: string;
        name: string;
        slug: string;
        description: string;
        specs: import("@prisma/client/runtime/library").JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
