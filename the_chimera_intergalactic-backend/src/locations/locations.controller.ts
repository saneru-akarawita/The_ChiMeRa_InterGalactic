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
} from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './locations.service';
import { Location } from '@prisma/client';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Response } from 'express';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Post('create')
  async createLocation(@Body() locationDto: CreateLocationDto) {
    const res = await this.locationService.createLocation(locationDto);
    return res;
  }

  @Get(':id')
  async getLocation(@Param('id') id: string): Promise<object> {
    const location: Location | null =
      await this.locationService.getLocationById(id);

    return { location };
  }

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
