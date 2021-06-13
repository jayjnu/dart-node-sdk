import { join } from 'path';
import { readFileSync } from 'fs';
import { XMLHandler } from './XMLHandler';
import corpCodeJSON from '../../../mocks/data/corpCode-xml.json';

const zipFile = readFileSync(
  join(__dirname, '../../../mocks/data/corpCode.xml.zip')
);

describe('.fromZipBuffer()', () => {
  it('xml.zip 파일을 JSON 형태로 반환한다.', async () => {
    const xmlHanlder = new XMLHandler();

    const json = await xmlHanlder.fromZipBuffer(zipFile).json();

    expect(json).toEqual(corpCodeJSON);
  });
});
