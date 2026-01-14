// src/roles/roles.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {}

  async create(body: any) {
    if (!body.name || !body.code) {
      throw new BadRequestException('name and code are required');
    }

    const exists = await this.roleModel.findOne({ code: body.code });
    if (exists) throw new BadRequestException('Role already exists');

    return this.roleModel.create(body);
  }

  findAll() {
    return this.roleModel.find();
  }

  findById(id: string) {
    return this.roleModel.findById(id);
  }

  update(id: string, body: any) {
    return this.roleModel.findByIdAndUpdate(id, body, { new: true });
  }

  delete(id: string) {
    return this.roleModel.findByIdAndDelete(id);
  }
}
