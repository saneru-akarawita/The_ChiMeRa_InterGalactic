import { Body, Controller, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationService: LocationsService) {}

  @Post('create')
  async createLocation(@Body() locationDto: CreateLocationDto) {
    // console.log({ locationDto });
    const res = await this.locationService.createLocation(locationDto);
    return res;
  }
}
