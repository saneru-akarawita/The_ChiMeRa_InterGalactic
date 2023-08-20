import { Controller, Post, Body, Res, Get, Param } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { Response, Request } from 'express';
import { start } from 'repl';

@Controller({
  version: '1',
  path: 'ships',
})
export class ShipsController {
  constructor(private readonly shipService: ShipsService) {}

  @Post('add')
  async createShip(@Body() createShipDto: CreateShipDto, @Res() res: Response) {
    const { name, id } = await this.shipService.createShip(createShipDto);
    res.send({ id, name });
  }

  @Get(':identifier')
  getShipByIdentifier(@Param('identifier') identifier: string) {
    return this.shipService.getShipByIdentifier(identifier);
  }

  @Get('all')
  getAllShips() {
    return this.shipService.getAllShips();
  }

  @Get(':stat/:end')
  filterShips(@Param('start') start: string, @Param('end') end: string) {
    return this.shipService.filterShips(start, end);
  }
}
