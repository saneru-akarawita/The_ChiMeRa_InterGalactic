import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from 'prisma/prisma-client';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post('create')
  async createActivity(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<object> {
    const createdActivity = await this.activitiesService.createActivity(
      createActivityDto,
    );
    return { created_activity: createdActivity };
  }

  @Get(':id')
  async getActivity(@Param('id') id: string): Promise<object> {
    const activity: Activity | null =
      await this.activitiesService.getActivityById(id);

    return { activity };
  }

  @Put(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
    @Res() response: Response,
  ) {
    let updatedActivity;

    try {
      updatedActivity = await this.activitiesService.updateActivityById(
        id,
        updateActivityDto,
      );
    } catch (error) {
      updatedActivity = null;
      response.statusCode = HttpStatus.NOT_FOUND;
    }

    response.send({ updated_activity: updatedActivity });
  }

  @Delete(':id')
  async deleteActivity(@Param('id') id: string, @Res() response: Response) {
    let deletedActivity;

    try {
      deletedActivity = await this.activitiesService.deleteActivityById(id);
    } catch (error) {
      deletedActivity = null;
      response.statusCode = HttpStatus.NOT_FOUND;
    }
    response.send({ deleted_activity: deletedActivity });
  }
}
