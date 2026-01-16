// src/users/users.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) { }

    // CREATE USER
    async create(body: any) {
        if (!body.email || !body.password || !body.username || !body.fullName || !body.roleId || !body.gender) {
            throw new BadRequestException(`Missing required fields ${body.gender}`);
        }

        const emailExists = await this.userModel.findOne({ email: body.email });
        if (emailExists) throw new BadRequestException('Email already exists');

        const usernameExists = await this.userModel.findOne({ username: body.username });
        if (usernameExists) throw new BadRequestException('Username already exists');

        return this.userModel.create({
            email: body.email,
            password: body.password,
            username: body.username,
            fullName: body.fullName,
            gender: body.gender,
            dob: body.dob,
            profile: body.profile,
            roleId: body.roleId,
            otp: body.otp || null,
            otpExpires: body.otpExpires || null,
        });
    }

    // FIND BY ID
    findById(id: string) {
        return this.userModel.findById(id).select('-password -otp');
    }

    // FIND BY EMAIL
    findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    // FIND BY USERNAME
    findByUsername(username: string) {
        return this.userModel.findOne({ username });
    }


    // UPDATE USER
    update(id: string, body: any) {
        return this.userModel.findByIdAndUpdate(id, body, { new: true });
    }

    // UPDATE LAST LOGIN
    updateLastLogin(id: string) {
        return this.userModel.findByIdAndUpdate(
            id,
            { lastLoginAt: new Date() },
            { new: true },
        );
    }

    // GET ALL USERS (without password & username)
    async findAll() {
        return this.userModel
            .find()
            .select('-password -username -otp -otpExpires')
            .lean();
    }
}
