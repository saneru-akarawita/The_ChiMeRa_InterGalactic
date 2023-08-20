import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { Response } from 'express';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/role.decorator';

@Controller({
  version: '1',
  path: 'ships',
})
export class ShipsController {
  constructor(private readonly shipService: ShipsService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post('add')
  async createShip(@Body() createShipDto: CreateShipDto, @Res() res: Response) {
    this.shipService
      .createShip(createShipDto)
      .then((result) => {
        res.status(201).json({
          message: 'Ship created successfully',
          data: result,
        });
      })
      .catch((e) => {
        res.status(400).json({
          message: e.message,
        });
      });
  }

  @Roles('TRAVELER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get('ship/:identifier')
  async getShipByIdentifier(@Param('identifier') identifier: string) {
    return await this.shipService.getShipByIdentifier(identifier);
  }

  @Roles('TRAVELER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get('all')
  async getAllShips() {
    try {
      return await this.shipService.getAllShips();
    } catch (e) {
      console.log(e);
    }
  }

  @Roles('TRAVELER', 'ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get('filter/:stat/:end')
  async filterShips(@Param('start') start: string, @Param('end') end: string) {
    return await this.shipService.filterShips(start, end);
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Delete('delete/:identifier')
  async deleteShip(
    @Param('identifier') identifier: string,
    @Res() response: Response,
  ) {
    let deletedShip;
    try {
      deletedShip = await this.shipService.deleteShip(identifier);
    } catch (error) {
      deletedShip = null;
      response.statusCode = HttpStatus.NOT_FOUND;
    }
    response.send({ deleted_location: deletedShip });
  }
}
