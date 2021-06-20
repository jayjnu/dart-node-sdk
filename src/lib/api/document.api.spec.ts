import { httpClient } from '~/util/http.util';
import { DocumentAPI } from './document.api';

describe('DocumentAPI', () => {
  it('should pass', async () => {
    const MOCK_CERT = 'xxxxxxx';
    const MOCK_RECEIPT_NO = '20190401004781';
    const api = new DocumentAPI(httpClient, MOCK_CERT);

    const buffer = await api.fetch(MOCK_RECEIPT_NO);

    expect(buffer).toBeDefined();
  });
});
