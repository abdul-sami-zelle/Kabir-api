import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    usersService: UsersService;
    jwtService: JwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(body: any): Promise<{
        message: string;
    }>;
    login(body: any): Promise<{
        message: string;
    }>;
    sendOtpEmail(email: string, fullName: string, otp: string): Promise<void>;
    verifyOtp(body: any): Promise<{
        token: string;
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
