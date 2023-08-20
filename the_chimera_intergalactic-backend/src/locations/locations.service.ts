import { Injectable } from '@nestjs/common';
import { MathCollection, cross, norm } from 'mathjs';
import { Location } from 'prisma/prisma-client';
import { ActivitiesService } from 'src/activities/activities.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileUploaderService } from 'src/utilities/file-uploader.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { GetCheckpointDto } from './dto/get-checkpoint.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

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

  async getAllLocations() {
    return await this.prisma.location.findMany({
      include: {
        Package: {
          select: {
            id: true,
          },
        },
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

  async getCheckPoints(
    getCheckpointDto: GetCheckpointDto,
  ): Promise<Array<any> | false> {
    const { source, destination, max_distance } = getCheckpointDto;

    let startLocation: Location | null;
    let endLocation: Location | null;
    let startLocationCoods: any[] = [];
    let currentLocationCoods: any[] = [];
    let endLocationCoods: (number | undefined)[] = [];

    try {
      startLocation = await this.getLocationById(source);
      startLocationCoods = [
        startLocation?.x,
        startLocation?.y,
        startLocation?.z,
      ];
      endLocation = await this.getLocationById(destination);
      endLocationCoods = [endLocation?.x, endLocation?.y, endLocation?.z];
    } catch (error) {
      console.log(error);
      return false;
    }

    const locations: Array<any> = await this.getAllLocations();

    const checkPoints: Array<any> = locations
      .filter((location: Location) => {
        return location.id !== source && location.id !== destination;
      })
      .filter((location: Location) => {
        currentLocationCoods = [location.x, location.y, location.z];
        const distance = this.getDistanceToLine(
          startLocationCoods,
          endLocationCoods,
          currentLocationCoods,
        );
        return distance < max_distance;
      })
      .map((location: Location) => {
        currentLocationCoods = [location.x, location.y, location.z];
        return {
          ...location,
          ...{
            distance: this.getPointDistance(
              startLocationCoods,
              currentLocationCoods,
            ),
          },
        };
      });
    return checkPoints;
  }

  getDistanceToLine(
    pointA: Array<any>,
    pointB: Array<any>,
    pointP: Array<any>,
  ): number {
    const [ax, ay, az] = pointA;
    const [bx, by, bz] = pointB;
    const [px, py, pz] = pointP;
    const dx = bx - ax;
    const dy = by - ay;
    const dz = bz - az;
    const apx = px - ax;
    const apy = py - ay;
    const apz = pz - az;

    const apd: MathCollection = cross([apx, apy, apz], [dx, dy, dz]);
    const num = norm(apd);
    const den = norm([dx, dy, dz]);
    return Number(num) / Number(den);
  }

  getPointDistance(pointA: Array<any>, pointB: Array<any>): number {
    const [ax, ay, az] = pointA;
    const [bx, by, bz] = pointB;
    const distance = norm([bx - ax, by - ay, bz - az]);
    return Number(distance);
  }
}
