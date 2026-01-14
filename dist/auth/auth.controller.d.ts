import express from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        message: string;
    }>;
    login(body: any): Promise<{
        message: string;
    }>;
    verifyOtp(body: any, res: express.Response): Promise<{
        success: boolean;
        message: string;
        user: {
            email: string;
            username: string;
            fullName: string;
            roleId: string;
            gender: string;
            profileImage: string;
            dob: string;
            lastLoginAt?: Date;
            _id: unknown;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id?: any;
            isNew: boolean;
            schema: import("mongoose").Schema;
            __v: number;
        };
    }>;
    logout(res: express.Response): {
        success: boolean;
        message: string;
    };
    me(req: express.Request): Promise<{
        success: boolean;
        user: null;
    } | {
        success: boolean;
        user: {
            email: string;
            username: string;
            fullName: string;
            roleId: string;
            gender: string;
            profileImage: string;
            dob: string;
            lastLoginAt?: Date;
            _id: unknown;
            $locals: Record<string, unknown>;
            $op: "save" | "validate" | "remove" | null;
            $where: Record<string, unknown>;
            baseModelName?: string;
            collection: import("mongoose").Collection;
            db: import("mongoose").Connection;
            errors?: import("mongoose").Error.ValidationError;
            id?: any;
            isNew: boolean;
            schema: import("mongoose").Schema;
            __v: number;
        };
    }>;
}
