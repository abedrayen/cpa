import { ProductsService } from './products.service';
import { ProductQueryDto } from './dto/product-query.dto';
export declare class ProductsController {
    private readonly products;
    constructor(products: ProductsService);
    findAll(query: ProductQueryDto): Promise<{
        data: {
            price: string;
            category: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                sortOrder: number;
                url: string;
                alt: string;
                productId: string;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            slug: string;
            metaTitle: string | null;
            metaDescription: string | null;
            categoryId: string;
            description: string;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            isQuoteOnly: boolean;
            stock: number;
            isActive: boolean;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findByCategory(categorySlug: string, query: ProductQueryDto): Promise<{
        data: {
            price: string;
            category: {
                id: string;
                name: string;
                slug: string;
            };
            images: {
                id: string;
                sortOrder: number;
                url: string;
                alt: string;
                productId: string;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            slug: string;
            metaTitle: string | null;
            metaDescription: string | null;
            categoryId: string;
            description: string;
            specs: import("@prisma/client/runtime/library").JsonValue | null;
            isQuoteOnly: boolean;
            stock: number;
            isActive: boolean;
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
        category: {
            name: string;
            slug: string;
        };
        images: {
            id: string;
            sortOrder: number;
            url: string;
            alt: string;
            productId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        slug: string;
        metaTitle: string | null;
        metaDescription: string | null;
        categoryId: string;
        description: string;
        specs: import("@prisma/client/runtime/library").JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
    }[]>;
    findBySlug(slug: string): Promise<{
        price: string;
        category: {
            id: string;
            name: string;
            slug: string;
            parent: {
                name: string;
                slug: string;
            } | null;
        };
        images: {
            id: string;
            sortOrder: number;
            url: string;
            alt: string;
            productId: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        slug: string;
        metaTitle: string | null;
        metaDescription: string | null;
        categoryId: string;
        description: string;
        specs: import("@prisma/client/runtime/library").JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
    }>;
}
