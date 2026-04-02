import { 
    getByPathAndParams, 
    postByPathAndData, 
    putByPathAndData, 
    deleteByPath 
} from './httpClient';
import type { Product, PaginatedProducts } from '@/types/Products';

export const getProducts = async (page: number = 1, limit: number = 9): Promise<PaginatedProducts> => {
    const response = await getByPathAndParams<PaginatedProducts>('api/products', { page, limit });
    return response.data;
};

export const getProductsByCategory = async (category: string, page: number = 1, limit: number = 9): Promise<PaginatedProducts> => {
    const response = await getByPathAndParams<PaginatedProducts>('api/products', { category, page, limit });
    return response.data;
}

export const getProductById = async (id: string): Promise<Product> => {
    const response = await getByPathAndParams<Product>(`api/products/${id}`);
    return response.data;
};

export const createProduct = async (data: Partial<Product>): Promise<Product> => {
    const response = await postByPathAndData<Product>('api/products', data);
    return response.data;
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await putByPathAndData<Product>(`api/products/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
    await deleteByPath(`api/products/${id}`);
};
