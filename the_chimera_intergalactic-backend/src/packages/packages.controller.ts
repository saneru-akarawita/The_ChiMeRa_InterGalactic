import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { JwtPayload } from 'src/types';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('package')
export class PackageController {
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post('create')
  async createPackage(@Req() req: Request) {
    const user = req.user as JwtPayload;
    console.log(user);

    return 'create package';
  }
}
