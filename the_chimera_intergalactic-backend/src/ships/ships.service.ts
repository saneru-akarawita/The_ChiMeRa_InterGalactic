import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FileUploaderService } from '../utilities/file-uploader.service';
import { CreateShipDto } from './dto/create-ship.dto';

@Injectable()
export class ShipsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploader: FileUploaderService,
  ) {}
  async createShip(createShipDto: CreateShipDto) {
    const { name, model, speed, identifier, ship_picture, seats, start, end } =
      createShipDto;

    const imageUrl = await this.fileUploader.uploadImageBase64(ship_picture);
    const createdShip = await this.prisma.ship.create({
      data: {
        name,
        model,
        speed,
        start,
        end,
        identifier,
        ship_pic: imageUrl ? imageUrl : '',
      },
    });
    seats.map(async (seat) => {
      for (let i = 0; i < seat.num_of_seats; i++) {
        const { seat_type, price } = seat;
        const ship = createdShip;
        await this.prisma.seat.create({
          data: {
            type: seat_type,
            ship_id: createdShip.id,
            booking_status: false,
            price: price,
          },
        });
      }
    });

    return createdShip;
  }

  getShipByIdentifier(identifier: string) {
    return this.prisma.ship.findUnique({
      where: {
        identifier,
      },
    });
  }

  findShipById(id: string) {
    return this.prisma.ship.findUnique({
      where: {
        id,
      },
    });
  }

  getAllShips() {
    return this.prisma.ship.findMany();
  }

  filterShips(start: string, end: string) {
    return this.prisma.ship.findMany({
      where: {
        start,
        end,
      },
    });
  }
}
