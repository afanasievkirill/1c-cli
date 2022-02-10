import { promises } from 'fs';
import { isAbsolute } from 'path';
import { join, dirname } from 'path/posix';

export class FileService {
  private async isExists(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, ext: string): string {
    if (!isAbsolute(path)) {
      path = join(__dirname + '/' + path);
    }
    if (name && ext) {
      return join(dirname(path) + '/' + 'name' + '.' + ext);
    }
    return path;
  }

  async deleteFileIfExists(path: string) {
    if (await this.isExists(path)) {
      promises.unlink(path);
    }
  }
}
