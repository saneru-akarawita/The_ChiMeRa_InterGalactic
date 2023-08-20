import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class GetCheckpointDto {
  @IsNotEmpty()
  @IsString({ message: 'Source id is not valid' })
  readonly source: string;

  @IsNotEmpty()
  @IsString({ message: 'Destination id is not valid' })
  readonly destination: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Distance should be greater than 1' })
  readonly max_distance: number;
}
