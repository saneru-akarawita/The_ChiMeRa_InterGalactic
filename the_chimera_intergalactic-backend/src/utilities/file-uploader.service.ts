import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ImageKit from 'imagekit';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class FileUploaderService {
  imagekit: ImageKit;

  constructor(private configService: ConfigService) {
    this.imagekit = new ImageKit({
      publicKey: this.configService.get<string>(
        'IMAGEKIT_PUBLIC_KEY',
      ) as string,
      privateKey: this.configService.get<string>(
        'IMAGEKIT_PRIVATE_KEY',
      ) as string,
      urlEndpoint: this.configService.get<string>(
        'IMAGEKIT_URL_ENDPOINT',
      ) as string,
    });
  }

  /**
   * Uploads and returns the public url of an image
   * @param imageFile
   */
  async uploadImage(
    imageFile: MemoryStoredFile,
    subDir?: string,
  ): Promise<string | false> {
    try {
      const result = await this.imagekit.upload({
        file: imageFile.buffer,
        fileName: imageFile.originalName,
        folder: `/intergalactic/${subDir ? subDir : ''}/images`,
      });
      return result.url;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
