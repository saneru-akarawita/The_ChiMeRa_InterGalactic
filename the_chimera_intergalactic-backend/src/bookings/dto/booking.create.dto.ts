import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

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
}
