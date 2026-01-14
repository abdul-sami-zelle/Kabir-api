import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        public usersService: UsersService,
        public jwtService: JwtService,
    ) { }

    // 🔹 REGISTER USER (no OTP)
    async register(body: any) {
        const { email, password, username, fullName, roleId, gender, profile, dob } = body;

        if (!email || !password || !username || !fullName || !roleId || !gender) {
            throw new BadRequestException('Missing required fields');
        }

        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) throw new BadRequestException('Email already registered');

        const hashedPassword = await bcrypt.hash(password, 10);

        await this.usersService.create({
            email,
            password: hashedPassword,
            username,
            fullName,
            roleId,
            gender,
            profile,
            dob
        });

        return { message: 'User registered successfully. Please login to get OTP.' };
    }

    async login(body: any) {
        const { username, password } = body;

        if (!username || !password) {
            throw new BadRequestException('Username and password required');
        }

        const user = await this.usersService.findByUsername(username);
        if (!user) throw new NotFoundException('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        await this.usersService.update((user._id as Types.ObjectId).toString(), {
            otp,
            otpExpires,
        });

        // Send OTP on EMAIL (email still used for delivery)
        try {
            await this.sendOtpEmail(user.email, otp);
        } catch (error) {
            console.error('OTP email failed:', error.message);
        }

        return {
            message: 'OTP generated. Please verify to login.',
        };
    }




    async sendOtpEmail(email: string, otp: string) {
        const transporter = nodemailer.createTransport({
            host: 'mail.simplykabir.com', // Replace with your SMTP server
            port: 587,                    // Usually 465 for SSL, or 587 for TLS
            secure: false,                 // true for port 465, false for port 587
            auth: {
                user: 'info@simplykabir.com',     // Your Webmail address
                pass: 'sigma@123@@@'     // Your Webmail password
            }
        });




        await transporter.sendMail({
            from: 'My App <info@simplykabir.com>',
            to: email,
            subject: 'Login OTP',
            text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
        });
    }

    async verifyOtp(body: any) {
        const { username, otp } = body;

        if (!username || !otp) {
            throw new BadRequestException('Username and OTP required');
        }

        const user = await this.usersService.findByUsername(username);
        if (!user) throw new UnauthorizedException('Invalid username or OTP');

        if (user.otp !== otp) throw new UnauthorizedException('Invalid OTP');
        if (!user.otpExpires || user.otpExpires < new Date()) {
            throw new UnauthorizedException('OTP expired');
        }

        const token = this.jwtService.sign({
            sub: (user._id as Types.ObjectId).toString(),
            roleId: user.roleId,
        });

        // Clear OTP & update last login
        await this.usersService.update((user._id as Types.ObjectId).toString(), {
            otp: null,
            otpExpires: null,
            lastLoginAt: new Date(),
        });

        // ❌ Sensitive fields remove
        const { password, otp: _, otpExpires, ...safeUser } = user.toObject();

        return {
            token,
            user: safeUser,
        };
    }

}
