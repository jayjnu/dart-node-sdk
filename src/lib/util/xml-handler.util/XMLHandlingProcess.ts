import { XMLUnzipper } from './XMLUnzipper';
import { parseStringPromise } from 'xml2js';

export class XMLHandlingProcess {
  constructor(private unzipper: XMLUnzipper) {}

  async json<T>(): Promise<T> {
    const xml = await this.unzipper.unzip();

    return await parseStringPromise(xml, { trim: true });
  }
}
