import got from 'got';
import { ResponseCommon } from '../api/type';

export const httpClient = got.extend({
  prefixUrl: 'https://opendart.fss.or.kr/api',
});

export type HttpClient = typeof httpClient;

const Got = got.extend({
  prefixUrl: 'https://opendart.fss.or.kr/api',
});

export default class HttpClient2 {
  private http = Got;
  constructor(private url: string, private cert_key: string) {}

  // TODO: generic 으로 unknown 을 없애고 싶은데 방법을 모르겠음 ResponseCommon 과 T 를 합성하고 싶음.
  async getJSON(params: URLSearchParams): Promise<unknown> {
    const json = (await this.http
      .get(this.url, {
        searchParams: {
          cert_key: this.cert_key,
          ...params,
        },
      })
      .json()) as ResponseCommon;

    if (json.status !== '000') {
      throw new Error(json.message);
    }

    return json;
  }
}
