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
                url: string;
                alt: string;
                sortOrder: number;
                productId: string;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            slug: string;
            description: string;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            isQuoteOnly: boolean;
            stock: number;
            isActive: boolean;
            metaTitle: string | null;
            metaDescription: string | null;
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
            url: string;
            alt: string;
            sortOrder: number;
            productId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        slug: string;
        description: string;
        specs: import("@prisma/client/runtime/library").JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
    }[]>;
    findBySlug(slug: string): Promise<{
        price: string;
        images: {
            id: string;
            url: string;
            alt: string;
            sortOrder: number;
            productId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        slug: string;
        description: string;
        specs: import("@prisma/client/runtime/library").JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
    }>;
}
