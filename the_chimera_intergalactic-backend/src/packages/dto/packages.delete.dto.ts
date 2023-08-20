import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePackageDto {
  @IsString()
  @IsNotEmpty({
    message: 'Package id is required',
  })
  readonly package_id: string;
}
