import { XMLUnzipper } from './XMLUnzipper';
import { XMLHandlingProcess } from './XMLHandlingProcess';

export class XMLHandler {
  fromZipBuffer(buffer: Buffer): XMLHandlingProcess {
    return new XMLHandlingProcess(new XMLUnzipper(buffer));
  }
}
