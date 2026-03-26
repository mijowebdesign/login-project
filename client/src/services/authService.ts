import baseApi, { setAccessToken } from './baseApi';
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
    const response = await baseApi.post<AuthResponse>('/auth/login', credentials);
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return response.data; 
};

export const register = async (data: RegisterRequest): Promise<{ message: string }> => {
    const response = await baseApi.post<{ message: string }>('/auth/register', data);
    return response.data; 
}

export const logout = async () => {
    try {
        await baseApi.post('/auth/logout');
    } finally {
        setAccessToken(null);
    }
}

export const refresh = async (): Promise<AuthResponse> => {
    const response = await baseApi.post<AuthResponse>('/auth/refresh');
    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return response.data;
}
