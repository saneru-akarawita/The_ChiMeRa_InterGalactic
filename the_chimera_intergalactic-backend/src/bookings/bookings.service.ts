import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/booking.create.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  async createBooking(bookingDto: CreateBookingDto, user_id: string) {
    const { package_id, starting_date } = bookingDto;
    // get the package from database to calculate the price and finish date
    const selectedPackage = await this.prisma.package.findUnique({
      where: {
        id: package_id,
      },
    });
    if (!selectedPackage) {
      throw new Error('Package not found');
    }
    const start = new Date(starting_date);
    const finish = new Date(starting_date);
    finish.setDate(start.getDate() + selectedPackage.duration);
    // TODO: calculate the price
    // TODO: create the booking
    return 'Hello World!';
  }
}
