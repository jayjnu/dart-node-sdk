/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { HttpInterceptor } from './http.util';
import type { Hooks } from 'got';

export type Interceptor = Partial<
  HttpInterceptor & Record<keyof HttpInterceptor, unknown>
>;

export class HTTPInterceptor implements Hooks {
  init = this.getInterceptors('init');
  beforeRedirect = this.getInterceptors('beforeRedirect');
  beforeError = this.getInterceptors('beforeError');
  beforeRequest = this.getInterceptors('beforeRequest');
  beforeRetry = this.getInterceptors('beforeRetry');
  afterResponse = this.getInterceptors('afterResponse');

  constructor(private interceptors: Interceptor[]) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  private getInterceptors<T extends keyof HttpInterceptor>(name: T) {
    const targetInterceptors = this.getTargetInterceptors(name);

    return targetInterceptors.map((interceptor) => {
      return this.getHookFromInterceptor(interceptor, name);
    });
  }

  private getTargetInterceptors(name: string): HttpInterceptor[] {
    return this.interceptors.filter(
      (interceptor) => name in interceptor
    ) as unknown as HttpInterceptor[];
  }

  private getHookFromInterceptor<T extends keyof HttpInterceptor>(
    interceptor: HttpInterceptor,
    name: T
  ) {
    return interceptor[name].bind(interceptor) as unknown as HttpInterceptor[T];
  }
}
