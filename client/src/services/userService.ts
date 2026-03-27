import baseApi from './baseApi';
import type { User } from './authService';

export const getUsers = async (): Promise<User[]> => {
    const response = await baseApi.get<User[]>('api/users');
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await baseApi.delete(`api/users/${id}`);
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
    const response = await baseApi.put<User>(`api/users/${id}`, data);
    return response.data;
};
    