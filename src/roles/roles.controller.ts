// src/roles/roles.controller.ts
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('roles')
// @UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() body: any) {
    return this.rolesService.create(body);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.rolesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.delete(id);
  }
}
