import got from 'got';
import { ResponseCommon } from '../api/type';
import { CancelableRequest, Response } from 'got/dist/source/as-promise';

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

  fetch(params: Record<string, unknown>): CancelableRequest<Response<string>> {
    return this.http.get(this.url, {
      searchParams: {
        crtfc_key: this.cert_key,
        ...params,
      },
    });
  }

  async getJSON<T extends ResponseCommon>(
    params: Record<string, unknown>
  ): Promise<T> {
    const json = await this.http
      .get(this.url, {
        searchParams: {
          crtfc_key: this.cert_key,
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
