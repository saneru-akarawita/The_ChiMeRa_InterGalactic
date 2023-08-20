import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateLocationDto } from 'src/locations/dto/create-location.dto';

export class UpdateLocationDto extends PartialType(
  OmitType(CreateLocationDto, ['activities']),
) {}
