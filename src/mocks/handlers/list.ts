import { rest } from 'msw';
import LIST_DATA from '../data/list';

export default [
  rest.get('https://opendart.fss.or.kr/api/list.json', (req, res, ctx) => {
    if (!req.url.searchParams.has('crtfc_key')) {
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

    const bgn_de = req.url.searchParams.get('bgn_de');

    if (!bgn_de) {
      return res(
        ctx.status(200),
        ctx.json({
          status: '013',
          message: '조회된 데이타가 없습니다.',
        })
      );
    }

    const data = LIST_DATA;

    return res(ctx.status(200), ctx.json(data));
  }),
];
