import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET ALL USERS (hide password & username)
  @Get()
  async getAllUsers() {
    const users = await this.usersService.findAll(); // we will add this in service
    return {
      success: true,
      count: users.length,
      users,
    };
  }
}
