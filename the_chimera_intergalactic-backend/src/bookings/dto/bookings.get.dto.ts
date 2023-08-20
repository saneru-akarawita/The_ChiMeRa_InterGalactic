import { IsNotEmpty, IsString } from 'class-validator';

export class GetSingleBookingDto {
  @IsString()
  @IsNotEmpty({
    message: 'Booking id is required',
  })
  readonly booking_id: string;
}
