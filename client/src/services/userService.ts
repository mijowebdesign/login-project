import baseApi from './baseApi';
import type { User } from './authService';

export const getUsers = async (): Promise<User[]> => {
    const response = await baseApi.get<User[]>('api/users');
    return response.data;
};
    