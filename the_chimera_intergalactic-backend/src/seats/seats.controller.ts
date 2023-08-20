import { Controller, Post, Body, Res, Get, Param, Patch } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreatSeatOnShip } from './dto/creat-seat-on-ship';
import { CreateSeatDto } from './dto/create-seat.dto';
import { Response, Request } from 'express';

@Controller({
  version: '1',
  path: 'seats',
})
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post('add')
  async createSeat(@Body() createSeatDto: CreateSeatDto, @Res() res: Response) {
    const count = await this.seatsService.createSeat(createSeatDto);
    res.send({ count });
  }

  @Get('ship/:ship_id')
  getSeatsByShip(@Param('ship_id') ship_id: string) {
    return this.seatsService.findSeatsByShip(ship_id);
  }

  @Patch('book/:id')
  bookASeat(@Param('id') id: string) {
    return this.seatsService.bookASeat(id);
  }

  @Get(':id')
  getSeatById(@Param('id') id: string) {
    return this.seatsService.findSeatById(id);
  }

  @Get('ship/identifier/:identifier')
  getSeatsByIdentifier(@Param('identifier') identifier: string) {
    return this.seatsService.findSeatsByShipIdentifier(identifier);
  }
}
