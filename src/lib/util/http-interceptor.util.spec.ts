import { HTTPInterceptor } from './http-interceptor.util';
import type { Interceptor } from './http-interceptor.util';

describe('HTTPInterceptor', () => {
  it('should pass', () => {
    expect(HTTPInterceptor).toBeDefined();
  });

  it('HttpInterceptor 구현체 리스트를 해당하는 hooks 배열에 추가한다.', () => {
    const interceptors: Interceptor[] = [
      {
        beforeRequest: () => Promise.resolve(),
      },
      {
        afterResponse: (res) => Promise.resolve(res),
      },
    ];
    const httpInterceptor = new HTTPInterceptor(interceptors);

    expect(httpInterceptor.beforeRequest.length).toBe(1);
    expect(httpInterceptor.afterResponse.length).toBe(1);
  });

  it('HttpInterceptor 인터페이스에 해당하지 않는 hooks는 추가하지 않는다', () => {
    const interceptors: Interceptor[] = [
      {
        beforeRequest: () => Promise.resolve(),
      },
    ];
    const httpInterceptor = new HTTPInterceptor(interceptors);

    expect(httpInterceptor.afterResponse.length).toBe(0);
  });
});
