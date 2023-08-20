import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { PackagesService } from './packages.service';
import { PackageDto } from './dto/packages.dto';
import { Response } from 'express';
import { DeletePackageDto } from './dto/packages.delete.dto';
import {
  PackageGetByLocationDto,
  PackageGetSingleDto,
} from './dto/packages.get.dto';

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
  @Get('get/location')
  async retrievePackagesByLocation(
    @Query() query: PackageGetByLocationDto,
    @Res() res: Response,
  ) {
    this.packagesService
      .retrievePackagesByLocation(query.location_id)
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
  @Get('get/single')
  async retrieveSinglePackage(
    @Query() query: PackageGetSingleDto,
    @Res() res: Response,
  ) {
    this.packagesService
      .retrieveSinglePackage(query.package_id)
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
  @Delete('delete')
  async deletePackage(
    @Query() deletePackageDto: DeletePackageDto,
    @Res() res: Response,
  ) {
    this.packagesService
      .deletePackage(deletePackageDto)
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
