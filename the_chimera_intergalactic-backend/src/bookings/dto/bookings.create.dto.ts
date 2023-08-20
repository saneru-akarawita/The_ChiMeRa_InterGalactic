import { SeatType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty({
    message: 'Package id is required',
  })
  readonly package_id: string;

  @IsString()
  @IsNotEmpty({
    message: 'Seat id is required',
  })
  readonly ship_id: string;

  @IsEnum(SeatType)
  readonly seat_type: SeatType;
}
