import got from 'got';
/**
 * TODO: low level 코드가 high level type에 의존성을 가지고 있음
 * 공통 에러 핸들링은 hooks 에 추상화 해서 옮긴뒤 해당 타입에 대한 의존성을 제거해야한다.
 */
import type { ResponseCommon } from '../api/type';
import type {
  Got,
  CancelableRequest,
  BeforeRequestHook,
  AfterResponseHook,
  InitHook,
  Hooks,
  Response,
  BeforeErrorHook,
  BeforeRedirectHook,
  BeforeRetryHook,
} from 'got';

export interface HttpInterceptor {
  init: InitHook;
  beforeRequest: BeforeRequestHook;
  beforeError: BeforeErrorHook;
  beforeRedirect: BeforeRedirectHook;
  beforeRetry: BeforeRetryHook;
  afterResponse: AfterResponseHook;
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
