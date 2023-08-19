import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';

enum PackageCategory {
  'adventure',
  'summit',
}

export class PackageDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsBoolean()
  readonly warp_drive: boolean;

  @IsEnum(PackageCategory, {
    message: `Selected category doesn't exist`,
  })
  readonly category: PackageCategory;

  @IsArray()
  @ArrayNotEmpty()
  readonly destinations: string[];

  @IsString()
  readonly accomadation: string;
}
