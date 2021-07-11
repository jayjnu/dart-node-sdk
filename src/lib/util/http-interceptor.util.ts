import type { HttpInterceptor } from './http.util';
import type { Hooks } from 'got';

export class HTTPInterceptor implements Hooks {
  init = [];
  beforeRedirect = [];
  beforeError = [];
  beforeRequest = [];
  BeforeRequestHook = [];
  beforeRetry = [];
  afterResponse = [];
  constructor(private interceptors: HttpInterceptor[]) {}
}
