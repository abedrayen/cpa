import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categories;
    constructor(categories: CategoriesService);
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
}
