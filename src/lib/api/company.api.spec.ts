import { CompanyAPI } from './company.api';

const MOCK_CERT = 'xxxxxxxxxxxx';

describe('.getJSON', () => {
  it('정확한 corp_code를 입력하는경우 결과를 제대로 리턴한다.', async () => {
    const corp_code = '00126380';
    const api = new CompanyAPI(MOCK_CERT);
    const res = await api.getJSON({ corp_code });

    expect(res.stock_name).toBe('삼성전자');
  });
});
