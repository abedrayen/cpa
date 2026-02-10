import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UpdateProductDto } from '../products/dto/update-product.dto';
import { ProductQueryDto } from '../products/dto/product-query.dto';
export declare class AdminProductsController {
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
    findById(id: string): Promise<{
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
    create(dto: CreateProductDto): Promise<{
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
    }>;
    update(id: string, dto: UpdateProductDto): Promise<{
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
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
