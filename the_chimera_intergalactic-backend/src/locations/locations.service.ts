import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploaderService } from 'src/utilities/file-uploader.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from 'prisma/prisma-client';
import { ActivitiesService } from 'src/activities/activities.service';

@Injectable()
export class LocationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileUploader: FileUploaderService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  async createLocation(
    createLocationDto: CreateLocationDto,
  ): Promise<Location> {
    const {
      name,
      description,
      x,
      y,
      z,
      type,
      image,
      destinations,
      activities,
    } = createLocationDto;

    const imageUrl = await this.fileUploader.uploadImageBase64(image);

    const createdLocation = await this.prisma.location.create({
      data: {
        name,
        description,
        x,
        y,
        z,
        type,
        destinations,
        image: imageUrl ? imageUrl : '',
      },
    });

    activities.forEach(async (activity) => {
      activity.location_id = createdLocation.id;
      // await this.activitiesService.createActivity(activity);
    });

    return createdLocation;
  }
}
