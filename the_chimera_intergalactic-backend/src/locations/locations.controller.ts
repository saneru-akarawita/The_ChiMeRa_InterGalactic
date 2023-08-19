import { Body, Controller, Post } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('locations')
export class LocationsController {
    @Post('create')
    async createLocation(@Body() locationDto: CreateLocationDto) {

        console.log(locationDto);

    }
}
