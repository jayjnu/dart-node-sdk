import type { Corp, CorpCodeAPI } from '~/api/corp-code.api';
import { CorpCodeModel } from './corp-code.model';

const fixtures: Corp[] = [
  {
    corp_code: 1,
    corp_name: '삼성전자',
    stock_code: 'KOSPI',
    modify_date: '1',
  },
  {
    corp_code: 2,
    corp_name: '삼성전기',
    stock_code: 'KOSPI',
    modify_date: '2',
  },
];

const createMockAPI = (): CorpCodeAPI => {
  return {
    getJSON: jest.fn(() => {
      return Promise.resolve({
        status: '200',
        message: 'ok',
        result: {
          list: fixtures,
        },
      });
    }),
  } as unknown as CorpCodeAPI;
};

describe('CorpCodeModel', () => {
  it('should pass', () => {
    expect(CorpCodeModel).toBeDefined();
  });

  describe('getCorpByName(name, options)', () => {
    it('options.exact === true면 name이 완전히 매칭되는 corp 목록을 반환한다.', async () => {
      const options = {
        exact: true,
      };
      const api = createMockAPI();
      const model = new CorpCodeModel(api);
      const corpList = await model.getCorpByName('삼성전자', options);

      expect(corpList.length).toBe(1);
      expect(corpList[0].corp_name).toBe(fixtures[0].corp_name);
    });
    it('options.exact === false면 name이 포함되는 corp 목록을 반환한다.', async () => {
      const options = {
        exact: false,
      };
      const api = createMockAPI();
      const model = new CorpCodeModel(api);
      const corpList = await model.getCorpByName('삼성', options);

      expect(corpList.length).toBe(2);
      expect(corpList[0].corp_name).toBe(fixtures[0].corp_name);
      expect(corpList[1].corp_name).toBe(fixtures[1].corp_name);
    });
    it.todo('매칭되는 항목이 없으면 빈 배열을 반환한다.');
  });
});
