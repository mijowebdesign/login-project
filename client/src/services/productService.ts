import baseApi from './baseApi';
import type { Product } from '@/types/Products';

export const getProducts = async (): Promise<Product[]> => {
    const response = await baseApi.get<Product[]>('api/products');
    return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
    const response = await baseApi.get<Product>(`api/products/${id}`);
    return response.data;
};

export const createProduct = async (data: Partial<Product>): Promise<Product> => {
    const response = await baseApi.post<Product>('api/products', data);
    return response.data;
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await baseApi.put<Product>(`api/products/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
    await baseApi.delete(`api/products/${id}`);
};
