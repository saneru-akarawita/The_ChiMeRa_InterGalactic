import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { MemoryStoredFile } from 'nestjs-form-data';
import { CreateActivityDto } from 'src/activities/dto/create-activity.dto';
import { IsValidType } from 'src/validators';
import { LocationType } from '@prisma/client';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readonly x: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readonly y: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  readonly z: number;

  @IsNotEmpty()
  @IsString()
  @IsValidType(Object.values(LocationType), {
    message: 'Invalid location type',
  })
  readonly type: LocationType;

  // TODO: Validate this
  readonly image: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  readonly destinations: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateActivityDto)
  readonly activities: CreateActivityDto[];
}
