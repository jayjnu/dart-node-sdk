import { Interceptor } from '~/util/http-interceptor.util';
import type { NormalizedOptions, Response } from 'got';

export class HTTPCacheInterceptor implements Interceptor {
  constructor(private cache: Map<string, Response>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRequest(options: NormalizedOptions): Response | void {
    // TODO: need implementation
    return;
  }

  // TODO: need implementation
  afterResponse(response: Response): Response {
    return response;
  }
}
