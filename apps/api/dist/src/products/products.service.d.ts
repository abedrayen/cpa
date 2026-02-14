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
                sortOrder: number;
                productId: string;
                url: string;
                alt: string;
            }[];
            id: string;
            name: string;
            slug: string;
            description: string;
            specs: Prisma.JsonValue | null;
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    findRelated(productId: string, limit?: number): Promise<{
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
        specs: Prisma.JsonValue | null;
        isQuoteOnly: boolean;
        stock: number;
        isActive: boolean;
        metaTitle: string | null;
        metaDescription: string | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }[]>;
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
        specs: Prisma.JsonValue | null;
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
        specs: Prisma.JsonValue | null;
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
