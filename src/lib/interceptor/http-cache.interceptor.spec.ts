import { HTTPCacheInterceptor } from './http-cache.interceptor';

describe('HTTPCacheInterceptor', () => {
  it('should pass', () => {
    expect(HTTPCacheInterceptor).toBeDefined();
  });

  it.todo('cache에 요청이 없으면 아무것도 return하지 않는다.');
  it.todo('cache에 요청이 있으면 캐시된 결과를 반환한다.');
  it.todo('response 를 받아오면 cache에 저장한다.');
});
