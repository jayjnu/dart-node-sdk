import got from 'got';
import type { ResponseCommon } from '../api/type';
import type {
  Got,
  CancelableRequest,
  BeforeRequestHook,
  Hooks,
  Response,
} from 'got';

export interface HttpInterceptor {
  beforeRequest: BeforeRequestHook;
}

export default class HttpClient {
  private http: Got;
  constructor(private cert_key: string, hooks?: Hooks) {
    this.http = got.extend({
      prefixUrl: 'https://opendart.fss.or.kr/api',
      searchParams: {
        crtfc_key: this.cert_key,
      },
      hooks,
    });
  }

  fetch(
    url: string,
    params?: Record<string, string | number>
  ): CancelableRequest<Response<string>> {
    return this.http.get(url, {
      searchParams: params,
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
