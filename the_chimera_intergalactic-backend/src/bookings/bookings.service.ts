import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/bookings.create.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  async createBooking(bookingDto: CreateBookingDto, user_id: string) {
    const { package_id, starting_date, seat_id } = bookingDto;
    // get the package from database to calculate the price and finish date
    const selectedPackage = await this.prisma.package.findUnique({
      where: {
        id: package_id,
      },
    });
    const selectedSeat = await this.prisma.seat.findUnique({
      where: {
        id: seat_id,
      },
    });

    if (!selectedPackage || !selectedSeat) {
      console.log(selectedPackage, selectedSeat, 'Not found');
      throw new Error('Package or Seat not found');
    }

    if (selectedSeat.booking_status) {
      console.log(selectedSeat, 'Already booked');
      throw new Error('Selecte seat is already booked');
    }

    const booking_date = new Date();
    const start = new Date(starting_date);
    const finish = new Date(starting_date);
    finish.setMonth(finish.getMonth() + selectedPackage.duration);

    const packagePrice = selectedPackage.price + selectedSeat.price;

    try {
      const booking = await this.prisma.booking.create({
        data: {
          booking_date,
          starting_date: start,
          finishing_date: finish,
          payment_amount: packagePrice,
          seat: {
            connect: {
              id: seat_id,
            },
          },
          package: {
            connect: {
              id: package_id,
            },
          },
          user: {
            connect: {
              id: user_id,
            },
          },
        },
      });

      const seat = await this.prisma.seat.update({
        where: {
          id: seat_id,
        },
        data: {
          booking_status: true,
        },
      });
      return { booking, seat };
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating booking');
    }
  }
  async getBookingsOfUser(user_id: string) {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          user_id,
        },
        include: {
          package: true,
          seat: true,
        },
      });
      return bookings;
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching bookings');
    }
  }
  async getSingleBooking(booking_id: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: booking_id,
        },
        include: {
          package: true,
          seat: true,
        },
      });
      return booking;
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching booking');
    }
  }
  async cancelBooking(booking_id: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: booking_id,
        },
        include: {
          package: true,
          seat: true,
        },
      });
      if (!booking) {
        throw new Error('Booking not found');
      }
      const seat = await this.prisma.seat.update({
        where: {
          id: booking.seat_id,
        },
        data: {
          booking_status: false,
        },
      });
      const deletedBooking = await this.prisma.booking.update({
        where: {
          id: booking_id,
        },
        data: {
          status: 'CANCELLED',
        },
      });
      return { deletedBooking, seat };
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching booking');
    }
  }
}
