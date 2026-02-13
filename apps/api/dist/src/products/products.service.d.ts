import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
export declare class ProductsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query: ProductQueryDto, forAdmin?: boolean): Promise<{
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
            specs: Prisma.JsonValue | null;
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
    }>;
    findRelated(productId: string, limit?: number): Promise<{
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
    }[]>;
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
        specs: Prisma.JsonValue | null;
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
        specs: Prisma.JsonValue | null;
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
