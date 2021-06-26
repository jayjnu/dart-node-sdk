import { fromBuffer, ZipFile, Entry } from 'yauzl';
import { Writable, Transform, Readable } from 'stream';

export class XMLUnzipper {
  constructor(private buffer: Buffer) {}

  async unzip(): Promise<Buffer> {
    const zipFile = await this.readFromBuffer();
    const zipFileStream = new ZipFileStream(zipFile);
    return await zipFileStream.toString();
  }

  private readFromBuffer(): Promise<ZipFile> {
    return new Promise((res, rej) => {
      fromBuffer(this.buffer, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
          rej(err);
          return;
        }

        if (!zipfile) {
          rej(new Error('No ZipFile was read'));
          return;
        }

        res(zipfile);
      });
    });
  }
}

class ZipFileStream {
  constructor(private zipFile: ZipFile) {}

  async toString() {
    const outputStream = ZipFileStream.createOutputStream();
    const output = this.streamToString(outputStream);

    await this.read(outputStream);

    return await output;
  }

  private read(outputStream: Writable): Promise<void> {
    const { zipFile } = this;

    return new Promise((res, rej) => {
      zipFile.readEntry();

      zipFile.on('entry', async (entry: Entry) => {
        const stream: Readable = await this.openReadStream(entry);

        stream.on('end', () => {
          zipFile.readEntry();
        });

        stream.pipe(outputStream);
      });

      zipFile.on('end', (err?: Error) => {
        if (err) {
          rej(err);
          return;
        }

        res();
      });
    });
  }

  private openReadStream(entry: Entry): Promise<Readable> {
    return new Promise((res, rej) => {
      this.zipFile.openReadStream(entry, (err, stream) => {
        if (err) {
          return rej(err);
        }
        if (!stream) {
          return rej(new Error('Failed to open a ReadStream'));
        }

        res(stream);
      });
    });
  }

  private static createOutputStream() {
    return new Transform({
      objectMode: true,
      transform(data: Buffer, enc, done) {
        done(null, data);
      },
    });
  }

  private streamToString(stream: Writable): Promise<Buffer> {
    const chunks: Buffer[] = [];

    return new Promise((resolve, reject) => {
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }
}
