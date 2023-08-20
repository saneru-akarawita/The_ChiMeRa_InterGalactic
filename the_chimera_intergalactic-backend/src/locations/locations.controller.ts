import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './locations.service';
import { Location } from '@prisma/client';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Response } from 'express';
import { GetCheckpointDto } from './dto/get-checkpoint.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Get('')
  getLocations() {
    return this.locationService.getAllLocations();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post('create')
  async createLocation(@Body() locationDto: CreateLocationDto) {
    const res = await this.locationService.createLocation(locationDto);
    return res;
  }

  @Roles('TRAVELER')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get('checkpoints')
  async calc(@Body() getCheckpointDto: GetCheckpointDto) {
    const checkpoints = await this.locationService.getCheckPoints(
      getCheckpointDto,
    );
    return { checkpoints };
  }

  @Roles('TRAVELER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getLocation(@Param('id') id: string): Promise<object> {
    const location: Location | null =
      await this.locationService.getLocationById(id);

    return { location };
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async updateLocation(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
    @Res() response: Response,
  ) {
    let updateLocation;

    try {
      updateLocation = await this.locationService.updateLocationyById(
        id,
        updateLocationDto,
      );
    } catch (error) {
      updateLocation = null;
      response.statusCode = HttpStatus.NOT_FOUND;
    }
    response.send({ updated_location: updateLocation });
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteLocation(@Param('id') id: string, @Res() response: Response) {
    let deletedLocation;

    try {
      deletedLocation = await this.locationService.deleteLocationById(id);
    } catch (error) {
      deletedLocation = null;
      response.statusCode = HttpStatus.NOT_FOUND;
    }
    response.send({ deleted_location: deletedLocation });
  }
}
