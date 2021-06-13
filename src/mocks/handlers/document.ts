import { rest } from 'msw';
import { readFileSync } from 'fs';
import { join } from 'path';

const xml = readFileSync(join(__dirname, '../data/document.xml.zip')).toString(
  'utf-8'
);

export default [
  rest.get('https://opendart.fss.or.kr/api/document.xml', (req, res, ctx) => {
    if (!req.url.searchParams.has('crtfc_key')) {
      return res(
        ctx.status(200),
        ctx.json({
          status: '900',
          message: '정의되지 않은 오류가 발생하였습니다.',
        })
      );
    }

    return res(ctx.status(200), ctx.text(xml));
  }),
];
