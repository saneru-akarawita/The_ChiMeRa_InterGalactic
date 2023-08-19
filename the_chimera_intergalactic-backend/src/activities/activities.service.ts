import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from 'prisma/prisma-client';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<Activity> {
    const { name, description, location_id } = createActivityDto;

    return await this.prisma.activity.create({
      data: {
        name,
        description,
        location_id,
      },
    });
  }

  async getActivity(id: string): Promise<Activity | null> {
    return await this.prisma.activity.findUnique({
      where: {
        id,
      },
    });
  }

  async updateActivity(
    id: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activity | null> {
    const { name, description } = updateActivityDto;

    return await this.prisma.activity.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
  }

  async deleteActivity(id: string): Promise<Activity | null> {
    return await this.prisma.activity.delete({
      where: {
        id,
      },
    });
  }
}
