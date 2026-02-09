export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  sortOrder: number;
  metaTitle: string | null;
  metaDescription: string | null;
  parent?: Category | null;
  children?: Category[];
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  specs: Record<string, unknown> | null;
  price: string;
  isQuoteOnly: boolean;
  stock: number;
  categoryId: string;
  category?: { id: string; name: string; slug: string; parent?: { name: string; slug: string } | null };
  images?: ProductImage[];
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface Paginated<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}
