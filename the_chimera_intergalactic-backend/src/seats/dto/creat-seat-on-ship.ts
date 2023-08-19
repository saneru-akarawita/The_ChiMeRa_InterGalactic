import { OmitType } from '@nestjs/swagger';
import { CreateSeatDto } from './create-seat.dto';

export class CreatSeatOnShip extends OmitType(CreateSeatDto, [
  'ship_id',
] as const) {}
