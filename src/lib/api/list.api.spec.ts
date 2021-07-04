import { ListAPI } from './list.api';
import HttpClient from '~/util/http.util';

const MOCK_CERT = 'xxxxxxxxxxxx';

describe('.getJSON', () => {
  let corp_code: string;
  let http: HttpClient;
  let api: ListAPI;
  beforeEach(() => {
    corp_code = '00126380';
    http = new HttpClient(MOCK_CERT);
    api = new ListAPI(http);
  });
  it('시작일이 없는 경우 에러를 리턴한다.', async () => {
    await expect(api.getJSON({ corp_code })).rejects.toThrow();
  });
  it('corp_code 와 bgn_de 를 입력하는 경우 결과를 제대로 리턴한다', async () => {
    const bgn_de = '20210117';
    const res = await api.getJSON({ corp_code, bgn_de });

    expect(res.list[0].corp_name).toEqual('삼성전자');
  });
});
