import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploaderService } from 'src/utilities/file-uploader.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploader: FileUploaderService,
  ) {}

  async createLocation(createLocationDto: CreateLocationDto) {
    const { name, description, x, y, z, type, image } = createLocationDto;
  }
}
