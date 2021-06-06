import { ListAPI } from './list.api';

describe('ListAPI', () => {
  it('should pass', () => {
    expect(ListAPI).toBeDefined();
  });

  it.todo(
    '요청인자 중 알 수 없는 데이터 타입(json, xml 외)인 경우 에러를 출력한다'
  );

  it.todo('요청인자 중 필수값(API 인증키)이 없는 경우 에러를 출력한다');
});
