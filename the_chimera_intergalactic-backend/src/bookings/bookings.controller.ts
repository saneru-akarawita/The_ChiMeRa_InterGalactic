import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateBookingDto } from './dto/booking.create.dto';
import { Request } from 'express';
import { JwtPayload } from 'src/types';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  @UseGuards(AccessTokenGuard)
  @Post('create')
  async createBooking(
    @Body() bookingDto: CreateBookingDto,
    @Req() req: Request,
  ) {
    const user = req.user as JwtPayload;
    return this.bookingsService.createBooking(bookingDto, user.id);
  }
}
