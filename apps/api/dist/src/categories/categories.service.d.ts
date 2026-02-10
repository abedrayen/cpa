import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findTree(): Promise<({
        children: ({
            children: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                deletedAt: Date | null;
                name: string;
                slug: string;
                parentId: string | null;
                sortOrder: number;
                metaTitle: string | null;
                metaDescription: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            name: string;
            slug: string;
            parentId: string | null;
            sortOrder: number;
            metaTitle: string | null;
            metaDescription: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        slug: string;
        parentId: string | null;
        sortOrder: number;
        metaTitle: string | null;
        metaDescription: string | null;
    })[]>;
    findBySlug(slug: string): Promise<{
        parent: {
            id: string;
            name: string;
            slug: string;
        } | null;
        children: {
            id: string;
            name: string;
            slug: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        slug: string;
        parentId: string | null;
        sortOrder: number;
        metaTitle: string | null;
        metaDescription: string | null;
    }>;
    create(dto: CreateCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        slug: string;
        parentId: string | null;
        sortOrder: number;
        metaTitle: string | null;
        metaDescription: string | null;
    }>;
    update(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        name: string;
        slug: string;
        parentId: string | null;
        sortOrder: number;
        metaTitle: string | null;
        metaDescription: string | null;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
