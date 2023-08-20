import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSeatDto } from './dto/create-seat.dto';

@Injectable()
export class SeatsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSeat(createSeatDto: CreateSeatDto) {
    const { seat_type, ship_id, num_of_seats, price } = createSeatDto;

    let count = 0;
    for (let i = 0; i < num_of_seats; i++) {
      await this.prisma.seat.create({
        data: {
          type: seat_type,
          ship_id,
          booking_status: false,
          price: price,
        },
      });
      count++;
    }
    return count;
  }

  bookASeat(id: string) {
    return this.prisma.seat.update({
      where: {
        id,
      },
      data: {
        booking_status: true,
      },
    });
  }

  findSeatById(id: string) {
    return this.prisma.seat.findUnique({
      where: {
        id,
      },
    });
  }

  findSeatsByShip(ship_id: string) {
    return this.prisma.seat.findMany({
      where: {
        ship_id,
      },
    });
  }
}
