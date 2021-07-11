import got, { Got } from 'got';
import { ResponseCommon } from '../api/type';
import { CancelableRequest, Response } from 'got/dist/source/as-promise';

export default class HttpClient {
  private http: Got;
  constructor(private cert_key: string) {
    this.http = got.extend({
      prefixUrl: 'https://opendart.fss.or.kr/api',
      searchParams: {
        crtfc_key: this.cert_key,
      },
    });
  }

  fetch(
    url: string,
    params?: Record<string, string | number>
  ): CancelableRequest<Response<string>> {
    return this.http.get(url, {
      searchParams: params,
      hooks: {},
    });
  }

  async getJSON<Request, Response extends ResponseCommon>(
    url: string,
    params?: Request
  ): Promise<Response> {
    const json = await this.fetch(
      url,
      params as unknown as Record<string, string | number>
    ).json<Response>();

    if (json.status !== '000') {
      throw new Error(json.message);
    }

    return json;
  }
}
