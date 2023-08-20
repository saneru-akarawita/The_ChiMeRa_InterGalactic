import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { Type } from 'class-transformer';

export class CreateShipDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly model: string;

  @IsString()
  @Length(8, 8)
  readonly identifier: string;

  @IsString()
  readonly start: string;

  @IsString()
  readonly end: string;

  @IsNumber()
  readonly speed: number;

  readonly ship_picture: string;

  @IsInt()
  readonly first_seat_total: number;

  @IsInt()
  readonly business_seat_total: number;

  @IsInt()
  readonly economy_seat_total: number;

  @IsNumber()
  readonly first_seat_price: number;

  @IsNumber()
  readonly business_seat_price: number;

  @IsNumber()
  readonly economy_seat_price: number;
}
