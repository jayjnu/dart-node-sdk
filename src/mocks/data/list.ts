import { ListResponse } from '../../lib/api/list.api';

const data: ListResponse = {
  status: '000',
  message: '정상',
  page_no: 1,
  page_count: 10,
  total_count: 92,
  total_page: 10,
  list: [
    {
      corp_code: '00126380',
      corp_name: '삼성전자',
      stock_code: '005930',
      corp_cls: 'Y',
      report_nm: '최대주주등소유주식변동신고서',
      rcept_no: '20210608800487',
      flr_nm: '삼성전자',
      rcept_dt: '20210608',
      rm: '유',
    },
  ],
};

export default data;
