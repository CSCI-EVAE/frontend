export interface LoginCredentials {
    username: string;
    password: string;
}
export interface AuthResponse {
    message: string;
    data: {
        accessToken: string;
        user: User;
    };
    success: boolean;
}

export interface User {
    id: number;
    username: string;
    email?: string;
    nom?: string;
    prenom?: string;
    role: string;
}
