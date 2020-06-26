export interface User {
    userId: number;
    username: string;
    password?: string;
    email: string;
}

export interface UserLogin {
    username: string;
    password: string;
}