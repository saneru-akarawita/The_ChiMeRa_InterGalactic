import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateBookingDto } from './dto/bookings.create.dto';
import { Request, Response } from 'express';
import { JwtPayload } from 'src/types';
import { Roles } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { GetSingleBookingDto } from './dto/bookings.get.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  @Roles('TRAVELER')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post('create')
  async createBooking(
    @Body() bookingDto: CreateBookingDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user as JwtPayload;
    this.bookingsService
      .createBooking(bookingDto, user.id)
      .then((result) => {
        res.status(201).json({
          message: 'Booking created successfully',
          data: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
  @Roles('TRAVELER')
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get('')
  async getBookingsOfUser(@Req() req: Request, @Res() res: Response) {
    const user = req.user as JwtPayload;
    this.bookingsService
      .getBookingsOfUser(user.id)
      .then((result) => {
        res.status(200).json({
          message: 'Bookings retrieved successfully',
          data: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
  @UseGuards(AccessTokenGuard)
  @Get('single')
  async getSingleBooking(
    @Query() bookingDto: GetSingleBookingDto,
    @Res() res: Response,
  ) {
    this.bookingsService
      .getSingleBooking(bookingDto.booking_id)
      .then((result) => {
        res.status(200).json({
          message: 'Booking retrieved successfully',
          data: result,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: err.message,
        });
      });
  }
}
