import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  isArray,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { CreateActivityDto } from 'src/activities/dto/create-activity.dto';
import { IsValidType } from 'src/validators';
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
  @IsValidType(['Asteroid', 'Planet'], { message: 'Invalid location type' })
  readonly type: string;

  @IsFile()
  @MaxFileSize(1e7)
  @HasMimeType(['image/jpeg', 'image/png'])
  readonly image: MemoryStoredFile;

  @IsArray()
  @ArrayMinSize(2)
  @IsString({ each: true })
  readonly destinations: string[];

  // @IsArray()
  // @ArrayMinSize(2)
  // @ValidateNested({ each: true })
  // @Type(() => CreateActivityDto)
  // readonly activities: CreateActivityDto[]
}
