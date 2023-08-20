import { SeatType } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty({
    message: 'Package id is required',
  })
  readonly package_id: string;

  @IsDateString()
  @IsNotEmpty({
    message: 'Starting date is required',
  })
  readonly starting_date: Date;

  @IsString()
  @IsNotEmpty({
    message: 'Seat id is required',
  })
  readonly ship_id: string;

  @IsEnum(SeatType)
  readonly seat_type: SeatType;
}
