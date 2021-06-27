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

  async getJSON<T extends ResponseCommon>(
    params: Record<string, unknown>
  ): Promise<T> {
    const json = await this.http
      .get(this.url, {
        searchParams: {
          cert_key: this.cert_key,
          ...params,
        },
      })
      .json<T>();

    if (json.status !== '000') {
      throw new Error(json.message);
    }

    return json;
  }
}
