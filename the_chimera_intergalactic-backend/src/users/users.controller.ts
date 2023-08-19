import { Controller, Post, Body, } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { UsersService } from './users.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateTravelerDto } from './dto/create-traveler.dto';

@Controller({
  version: '1',
  path: 'users'
})
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
}
