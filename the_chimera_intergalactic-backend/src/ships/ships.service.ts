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
    const {
      name,
      model,
      speed,
      identifier,
      ship_picture,
      start,
      end,
      first_seat_total,
      economy_seat_total,
      business_seat_total,
      first_seat_price,
      business_seat_price,
      economy_seat_price,
    } = createShipDto;
    let imageUrl;
    if (ship_picture) {
      imageUrl = await this.fileUploader.uploadImageBase64(ship_picture);
    }

    if (start === end)
      throw new Error('Start and End cannot be the same location');

    try {
      const createdShip = await this.prisma.ship.create({
        data: {
          name,
          model,
          speed,
          first_seat_price,
          business_seat_price,
          economy_seat_price,
          first_seat_total,
          business_seat_total,
          economy_seat_total,
          identifier,
          ship_pic: imageUrl ? imageUrl : '',
          start,
          end,
        },
      });
      return createdShip;
    } catch (error) {
      console.log(error);
      throw new Error('Error while creating ship');
    }
  }

  getShipByIdentifier(identifier: string) {
    return this.prisma.ship.findUnique({
      where: {
        identifier,
      },
    });
  }

  async findShipById(id: string) {
    return await this.prisma.ship.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllShips() {
    const allShips = await this.prisma.ship.findMany();
    console.log(allShips);
    return allShips;
  }

  async filterShips(start: string, end: string) {
    return await this.prisma.ship.findMany({
      where: {
        start,
        end,
      },
    });
  }

  async deleteShip(identifier: string) {
    return await this.prisma.ship.delete({
      where: {
        identifier,
      },
    });
  }
}
