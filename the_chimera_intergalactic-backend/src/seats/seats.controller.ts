import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreatSeatOnShip } from './dto/creat-seat-on-ship';
import { CreateSeatDto } from './dto/create-seat.dto';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller({
  version: '1',
  path: 'seats',
})
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post('add')
  async createSeat(@Body() createSeatDto: CreateSeatDto, @Res() res: Response) {
    const count = await this.seatsService.createSeat(createSeatDto);
    res.send({ count });
  }

  @Roles('TRAVELER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get('ship/:ship_id')
  async getSeatsByShip(@Param('ship_id') ship_id: string) {
    return await this.seatsService.findSeatsByShip(ship_id);
  }

  @Roles('TRAVELER')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Patch('book/:id')
  async bookASeat(@Param('id') id: string) {
    return await this.seatsService.bookASeat(id);
  }

  @Roles('TRAVELER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  getSeatById(@Param('id') id: string) {
    return this.seatsService.findSeatById(id);
  }

  @Roles('TRAVELER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get('ship/identifier/:identifier')
  getSeatsByIdentifier(@Param('identifier') identifier: string) {
    return this.seatsService.findSeatsByShipIdentifier(identifier);
  }
}
