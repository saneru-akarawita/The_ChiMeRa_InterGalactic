import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/bookings.create.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}
  async createBooking(bookingDto: CreateBookingDto, user_id: string) {
    const { package_id, ship_id, seat_type } = bookingDto;
    // get the package from database to calculate the price and finish date
    const selectedPackage = await this.prisma.package.findUnique({
      where: {
        id: package_id,
      },
    });
    const selectedShip = await this.prisma.ship.findUnique({
      where: {
        id: ship_id,
      },
    });

    if (!selectedPackage || !selectedShip) {
      console.log(selectedPackage, selectedShip, 'Not found');
      throw new Error('Package or Seat not found');
    }

    switch (seat_type) {
      case 'FIRST':
        if (
          selectedShip.first_seat_total === selectedShip.first_seat_occupied
        ) {
          throw new Error('No more first class seats available');
        }
        break;
      case 'BUSINESS':
        if (
          selectedShip.business_seat_total ===
          selectedShip.business_seat_occupied
        ) {
          throw new Error('No more business class seats available');
        }
        break;
      case 'ECONOMY':
        if (
          selectedShip.economy_seat_total === selectedShip.economy_seat_occupied
        ) {
          throw new Error('No more economy class seats available');
        }
        break;
      default:
        throw new Error('Invalid seat type');
    }

    const booking_date = new Date();

    const packagePrice = selectedPackage.price;

    try {
      const booking = await this.prisma.booking.create({
        data: {
          booking_date,
          payment_amount: packagePrice,
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
          ship: {
            connect: {
              id: ship_id,
            },
          },
          seat_type: seat_type,
        },
      });

      // change the seat occupied count accordingly
      let data = {};
      switch (seat_type) {
        case 'FIRST':
          data = {
            first_seat_occupied: selectedShip.first_seat_occupied + 1,
          };
          break;
        case 'BUSINESS':
          data = {
            business_seat_occupied: selectedShip.business_seat_occupied + 1,
          };
          break;
        case 'ECONOMY':
          data = {
            economy_seat_occupied: selectedShip.economy_seat_occupied + 1,
          };
          break;
        default:
          throw new Error('Invalid seat type');
      }

      const updatedShip = await this.prisma.ship.update({
        where: {
          id: ship_id,
        },
        data,
      });

      return { booking, updatedShip };
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
          ship: true,
        },
      });
      if (!booking) {
        throw new Error('Booking not found');
      }

      // change the seat occupied count accordingly
      let data = {};
      switch (booking.seat_type) {
        case 'FIRST':
          data = {
            first_seat_occupied: booking.ship.first_seat_occupied - 1,
          };
          break;
        case 'BUSINESS':
          data = {
            business_seat_occupied: booking.ship.business_seat_occupied - 1,
          };
          break;
        case 'ECONOMY':
          data = {
            economy_seat_occupied: booking.ship.economy_seat_occupied - 1,
          };
          break;
        default:
          throw new Error('Invalid seat type');
      }
      const ship = await this.prisma.ship.update({
        where: {
          id: booking.ship_id,
        },
        data,
      });

      const deletedBooking = await this.prisma.booking.update({
        where: {
          id: booking_id,
        },
        data: {
          status: 'CANCELLED',
        },
      });
      // return { deletedBooking, seat };
    } catch (error) {
      console.log(error);
      throw new Error('Error while fetching booking');
    }
  }
}
