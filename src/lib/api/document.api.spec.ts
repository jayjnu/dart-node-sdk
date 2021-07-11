import { DocumentAPI } from './document.api';
import HttpClient from '../util/http.util';

const MOCK_CERT = 'xxxxxxx';

describe('DocumentAPI', () => {
  it('should pass', async () => {
    const MOCK_RECEIPT_NO = '20190401004781';
    const http = new HttpClient(MOCK_CERT);
    const api = new DocumentAPI(http);

    const buffer = await api.fetch(MOCK_RECEIPT_NO);

    expect(buffer).toBeDefined();
  });
});
