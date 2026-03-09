export interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}   