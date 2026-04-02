import { setAccessToken } from './baseApi';
import { postByPathAndData } from './httpClient';
import type { User } from '@/types/Users';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
  role?: 'user' | 'manager' | 'admin';
}

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await postByPathAndData<AuthResponse>('/auth/login', credentials);
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return response.data; 
};

export const register = async (data: RegisterRequest): Promise<{ message: string }> => {
    const response = await postByPathAndData<{ message: string }>('/auth/register', data);
    return response.data; 
}

export const logout = async () => {
    try {
        await postByPathAndData('/auth/logout');
    } finally {
        setAccessToken(null);
    }
}

export const refresh = async (): Promise<AuthResponse> => {
    const response = await postByPathAndData<AuthResponse>('/auth/refresh');
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return response.data;
}
