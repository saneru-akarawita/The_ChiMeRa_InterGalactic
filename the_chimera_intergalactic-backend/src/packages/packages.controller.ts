import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { PackagesService } from './packages.service';
import { PackageDto } from './dto/packages.dto';

@Controller('package')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post('create')
  async createPackage(@Body() packageDto: PackageDto) {
    console.log(packageDto);
    return this.packagesService.createPackage();
  }
  @UseGuards(AccessTokenGuard)
  @Get('retrieve')
  async retrievePackages() {
    return this.packagesService.retrievePackages();
  }
}
