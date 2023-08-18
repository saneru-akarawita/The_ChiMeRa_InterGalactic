import { Module } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';

@Module({
  providers: [FileUploaderService],
  exports: [FileUploaderService],
})
export class UtilitiesModule {}
