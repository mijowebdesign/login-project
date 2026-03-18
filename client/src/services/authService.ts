import baseApi from './baseApi';
import { routes } from '../constants/navigations';


export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  message: string;
  user: {
    name: string;
    email: string;
    token?: string;
  };
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}

export const login = async (credentials: LoginRequest): Promise<UserResponse> => {
    const response = await baseApi.post<UserResponse>(routes.LOGIN, credentials);
    return response.data; 
};

export const register = async (data: RegisterRequest): Promise<UserResponse> => {
    const response = await baseApi.post<UserResponse>(routes.REGISTER, data);
    return response.data; 
}


