import got from 'got';
import { ResponseCommon } from '../api/type';
import { CancelableRequest, Response } from 'got/dist/source/as-promise';

const Got = got.extend({
  prefixUrl: 'https://opendart.fss.or.kr/api',
});

export default class HttpClient {
  private http = Got;
  constructor(private cert_key: string) {}

  fetch(
    url: string,
    params?: Record<string, unknown>
  ): CancelableRequest<Response<string>> {
    return this.http.get(url, {
      searchParams: {
        crtfc_key: this.cert_key,
        ...params,
      },
    });
  }

  async getJSON<T extends ResponseCommon>(
    url: string,
    params: Record<string, unknown>
  ): Promise<T> {
    const json = await this.fetch(url, params).json<T>();

    if (json.status !== '000') {
      throw new Error(json.message);
    }

    return json;
  }
}
