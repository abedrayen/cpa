import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: ProductQueryDto, categorySlug?: string, forAdmin?: boolean): Promise<{
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
            specs: Prisma.JsonValue | null;
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
    }>;
    findRelated(productId: string, categoryId: string, limit?: number): Promise<{
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
    }[]>;
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
        specs: Prisma.JsonValue | null;
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
