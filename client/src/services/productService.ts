import { 
    getByPathAndParams, 
    postByPathAndData, 
    putByPathAndData, 
    deleteByPath 
} from './httpClient';
import type { Product, PaginatedProducts } from '@/types/Products';

export const getProducts = async (page: number = 1, limit: number = 9, categoryId?: string): Promise<PaginatedProducts> => {
    const response = await getByPathAndParams<PaginatedProducts>('api/products', { page, limit, categoryId });
    return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
    const response = await getByPathAndParams<Product>(`api/products/${id}`);
    return response.data;
};

export const createProduct = async (data: Partial<Product>): Promise<Product> => {
    const payload = {
        ...data,
        category: (data.category && typeof data.category === 'object') ? (data.category as any).id : data.category
    };
    const response = await postByPathAndData<Product>('api/products', payload);
    return response.data;
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
    const payload = {
        ...data,
        category: (data.category && typeof data.category === 'object') ? (data.category as any).id : data.category
    };
    const response = await putByPathAndData<Product>(`api/products/${id}`, payload);
    return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
    await deleteByPath(`api/products/${id}`);
};
