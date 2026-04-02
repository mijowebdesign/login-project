import { 
    getByPathAndParams, 
    putByPathAndData, 
    deleteByPath 
} from './httpClient';
import type { User } from './authService';

export const getUsers = async (): Promise<User[]> => {
    const response = await getByPathAndParams<User[]>('api/users');
    return response.data;
};

export const deleteUser = async (id: string): Promise<void> => {
    await deleteByPath(`api/users/${id}`);
};

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
    const response = await putByPathAndData<User>(`api/users/${id}`, data);
    return response.data;
};
