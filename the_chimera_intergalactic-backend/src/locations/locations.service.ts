import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploaderService } from 'src/utilities/file-uploader.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from 'prisma/prisma-client';
import { ActivitiesService } from 'src/activities/activities.service';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UpdateActivityDto } from 'src/activities/dto/update-activity.dto';

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
      await this.activitiesService.createActivity(activity);
    });

    return createdLocation;
  }

  async getLocationById(id: string): Promise<Location | null> {
    return await this.prisma.location.findUnique({
      where: {
        id,
      },
    });
  }

  async updateLocationyById(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location | null> {
    // Remove 'activities' field from updateLocationDto
    const newUpdateLocationDto = JSON.parse(JSON.stringify(updateLocationDto));
    if (Object.keys(newUpdateLocationDto).includes('activities')) {
      delete newUpdateLocationDto.activities;
    }

    return await this.prisma.location.update({
      where: {
        id,
      },
      data: newUpdateLocationDto,
    });
  }

  async deleteLocationById(id: string): Promise<Location | null> {
    return await this.prisma.location.delete({
      where: {
        id,
      },
    });
  }
}
