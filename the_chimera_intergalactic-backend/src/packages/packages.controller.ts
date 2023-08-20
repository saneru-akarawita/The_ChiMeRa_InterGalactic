import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { PackagesService } from './packages.service';
import { PackageDto } from './dto/packages.dto';
import { Response } from 'express';

@Controller('package')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post('create')
  async createPackage(@Body() packageDto: PackageDto, @Res() res: Response) {
    console.log(packageDto);
    this.packagesService
      .createPackage(packageDto)
      .then((newPackage) => {
        console.log(newPackage);
        res.send({
          message: 'Package created successfully',
        });
      })
      .catch(() => {
        res.status(500).send({
          message: 'Unable to save package on database',
        });
      });
  }
  @UseGuards(AccessTokenGuard)
  @Get('retrieve')
  async retrievePackages() {
    return this.packagesService.retrievePackages();
  }
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Delete('delete')
  async deletePackage() {
    return 'delete package';
  }
}
