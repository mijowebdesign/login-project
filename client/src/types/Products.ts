export interface Product {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    price: number;
}

export interface PaginatedProducts {
    products: Product[];
    currentPage: number;
    totalPages: number;
    totalProducts: number;
}