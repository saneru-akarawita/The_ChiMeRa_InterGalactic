import { PackageCategory } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class PackageDto {
  @IsString()
  @IsNotEmpty({
    message: 'Package name is required',
  })
  readonly name: string;

  @IsBoolean()
  readonly warp_drive: boolean;

  @IsEnum(PackageCategory, {
    message: 'Must be a valid package category',
  })
  readonly category: PackageCategory;

  @IsArray()
  @ArrayNotEmpty()
  readonly destinations: string[];

  @IsString()
  readonly accomodation: string;

  @IsNumber()
  @IsNotEmpty({
    message: 'Package price is required',
  })
  readonly price: number;

  @IsArray()
  @ArrayNotEmpty({
    message: 'Package activities are required',
  })
  readonly activities: string[];

  @IsNumber()
  @IsNotEmpty({
    message: 'Package duration is required',
  })
  readonly duration: number;

  @IsString()
  @IsNotEmpty({
    message: 'Package location is required',
  })
  readonly location: string;
}
