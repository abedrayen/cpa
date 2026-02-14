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
    findById(id: string): Promise<{
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
    create(dto: CreateProductDto): Promise<{
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
    update(id: string, dto: UpdateProductDto): Promise<{
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
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
