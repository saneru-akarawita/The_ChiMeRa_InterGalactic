import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
