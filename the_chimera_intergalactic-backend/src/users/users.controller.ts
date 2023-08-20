import { Controller, Req, Get, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { JwtPayload } from 'src/types';

@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('TRAVELER')
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get('travelers/get-profile')
  getTravelerProfile(@Req() req: Request) {
    const user = req.user as JwtPayload;
    return this.usersService.getTravelerProfile(user.id);
  }
}
