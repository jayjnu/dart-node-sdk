import { rest } from 'msw';
import COMPANY_DATA from '../data/company';

export default [
  rest.get('https://opendart.fss.or.kr/api/company.json', (req, res, ctx) => {
    if (!req.url.searchParams.has('cert_key')) {
      return res(ctx.status(403));
    }

    const corp_code = req.url.searchParams.get('corp_code');

    if (!corp_code) {
      return res(
        ctx.status(200),
        ctx.json({
          status: '900',
          message: '정의되지 않은 오류가 발생하였습니다.',
        })
      );
    }

    const data = COMPANY_DATA[corp_code];

    if (!data) {
      // TODO: 정확한 에러 메세지, response 파악 필요
      return res(
        ctx.status(200),
        ctx.json({
          status: '010',
          message: '없는 데이터',
        })
      );
    }

    return res(ctx.status(200), ctx.json(data));
  }),
];
