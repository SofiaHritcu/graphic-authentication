declare module GA {
    export interface RootState {
        version: string;
    }

    export interface AuthenticationState {
        gaToken: string;
        user: GA.UserBase;
        status: string;
    }

    export interface UserBase {
        userName: string,
        name?: string,
        email?: string,
        password: string,
        confirmPassword?: string,
    }
};