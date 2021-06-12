import { rest } from 'msw';

export default [
  rest.get('https://opendart.fss.or.kr/api/company.json', (req, res, ctx) => {
    if (!req.url.searchParams.has('cert_key')) {
      return res(ctx.status(403));
    }

    return res(ctx.status(200));
  }),
];
