import { CorpCodeModel } from './corp-code.model';

describe('CorpCodeModel', () => {
  it('should pass', () => {
    expect(CorpCodeModel).toBeDefined();
  });

  describe('getCorpByName(name, options)', () => {
    it.todo(
      'options.exact === true면 name이 완전히 매칭되는 corp 목록을 반환한다.'
    );
    it.todo('options.exact === false면 name이 포함되는 corp 목록을 반환한다.');
    it.todo('매칭되는 항목이 없으면 빈 배열을 반환한다.');
  });
});
