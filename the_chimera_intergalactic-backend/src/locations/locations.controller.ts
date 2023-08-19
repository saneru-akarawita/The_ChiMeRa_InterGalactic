import { Body, Controller, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';

@Controller('locations')
export class LocationsController {
  @Post('create')
  async createLocation(@Body() locationDto: CreateLocationDto) {
    console.log(locationDto);
  }
}
