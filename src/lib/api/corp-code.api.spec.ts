import { httpClient } from '../util/http.util';
import {
  CorpCodeAPI,
  XMLHandler,
  XMLHandlingProcess,
  XMLParsingResult,
} from './corp-code.api';

const MOCK_CERT = 'Xxxxxxx';
const mockJSON = jest.fn();
const mockXMLHandlingProcess: XMLHandlingProcess<XMLParsingResult> = {
  json: mockJSON,
};
const mockXMLHandler: XMLHandler<XMLParsingResult> = {
  fromZipBuffer: () => {
    return mockXMLHandlingProcess;
  },
};

describe('.getJSON()', () => {
  it('요청이 성공적이면 response를 반환한다.', async () => {
    const response = {
      status: '000',
      result: {
        list: [
          {
            corp_code: ['00434003'],
            corp_name: ['다코'],
            stock_code: [' '],
            modify_date: ['20170630'],
          },
        ],
      },
    };
    const api = new CorpCodeAPI(httpClient, MOCK_CERT, mockXMLHandler);

    mockJSON.mockResolvedValueOnce(response);

    const res = await api.getJSON();

    expect(res).toEqual({
      status: '000',
      result: {
        list: [
          {
            corp_code: '00434003',
            corp_name: '다코',
            stock_code: '',
            modify_date: '20170630',
          },
        ],
      },
    });
  });
});
