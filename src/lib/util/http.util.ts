import got from 'got';

export const httpClient = got.extend({
  prefixUrl: 'https://opendart.fss.or.kr/api',
});
