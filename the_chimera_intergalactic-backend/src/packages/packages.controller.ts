import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { JwtPayload } from 'src/types';
import { Request } from 'express';

@Controller('package')
export class PackageController {
  @UseGuards(AccessTokenGuard)
  @Post('create')
  async createPackage(@Req() req: Request) {
    const user = req.user as JwtPayload;
    console.log(user);

    return 'create package';
  }
}
