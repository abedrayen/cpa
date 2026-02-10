export declare class ProductQueryDto {
    page: number;
    limit: number;
    sort?: 'name' | 'price' | 'createdAt';
    order?: 'asc' | 'desc';
    search?: string;
}
