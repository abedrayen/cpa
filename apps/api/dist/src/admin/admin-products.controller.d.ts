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
    findById(id: string): Promise<{
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
    create(dto: CreateProductDto): Promise<{
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
    update(id: string, dto: UpdateProductDto): Promise<{
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
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
