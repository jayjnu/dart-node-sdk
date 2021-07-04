import { ListAPI } from './list.api';

const MOCK_CERT = 'xxxxxxxxxxxx';

describe('.getJSON', () => {
  it('시작일이 없는 경우 에러를 리턴한다.', async () => {
    const corp_code = '00126380';
    const api = new ListAPI(MOCK_CERT);
    await expect(api.getJSON({ corp_code })).rejects.toThrow();
  });
  it('corp_code 와 bgn_de 를 입력하는 경우 결과를 제대로 리턴한다', async () => {
    const corp_code = '00126380';
    const bgn_de = '20210117';
    const api = new ListAPI(MOCK_CERT);
    const res = await api.getJSON({ corp_code, bgn_de });

    expect(res.list[0].corp_name).toEqual('삼성전자');
  });
});
