import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

@Controller('packages')
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
  @Get('get/location/:location_id')
  async retrievePackagesByLocation(
    @Param('location_id') location_id: string,
    @Res() res: Response,
  ) {
    this.packagesService
      .retrievePackagesByLocation(location_id)
      .then((packages) => {
        console.log(packages);
        res.send(packages);
      })
      .catch(() => {
        res.status(500).send({
          message: 'Unable to save package on database',
        });
      });
  }
  @UseGuards(AccessTokenGuard)
  @Get('get/:package_id')
  async retrieveSinglePackage(
    @Param('package_id') package_id: string,
    @Res() res: Response,
  ) {
    this.packagesService
      .retrieveSinglePackage(package_id)
      .then((data) => {
        console.log(data);
        res.send(data);
      })
      .catch(() => {
        res.status(500).send({
          message: 'Unable to save package on database',
        });
      });
  }
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Delete('delete/:package_id')
  async deletePackage(
    @Param('package_id') package_id: string,
    @Res() res: Response,
  ) {
    this.packagesService
      .deletePackage(package_id)
      .then((deletedPackage) => {
        console.log(deletedPackage);
        if (deletedPackage.count === 0) {
          res.status(404).send({
            message: 'Package for given id is not found',
          });
        } else {
          res.send({
            message: 'Package deleted successfully',
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          message: 'Unable to delete package on database',
        });
      });
  }
}
