export interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}   

 export interface UserState {
    name: string | null;
    email: string | null;
    token?: string | null;
    isPending?: boolean | null;
    message?: string | null;
  
}