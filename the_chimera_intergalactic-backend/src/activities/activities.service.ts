import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from 'prisma/prisma-client';

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
}
