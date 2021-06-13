type DataType = 'json' | 'xml';

export interface ListRequest {
  /**
   * API 인증키
   */
  crtfc_key: string;
  /**
   * 고유번호
   */
  corp_code: string;
  /**
   * 시작일
   */
  bgn_de: string;
  /**
   * 종료일
   */
  end_de: string;
  /**
   * 최종보고서 검색여부
   */
  last_reprt_at: string;
  /**
   * 공시유형
   */
  pblntf_ty: string;
  /**
   * 공시상세유형
   */
  pblntf_detail_ty: string;
  /**
   * 법인구분
   */
  corp_cls: string;
  /**
   * 정렬
   */
  sort: string;
  /**
   * 정렬방법
   */
  sort_mth: string;
  /**
   * 페이지 번호
   */
  page_no: string;
  /**
   * 페이지 별 건수
   */
  page_count: string;
}

export interface ListResponse {
  /**
   * 에러 및 정보 코드
   */
  status: string;
  /**
   * 에러 및 정보 메시지
   */
  message: string;
  /**
   * 페이지 번호
   */
  page_no: string;
  /**
   * 페이지 별 건수
   */
  page_count: string;
  /**
   * 총 건수
   */
  total_count: string;
  /**
   * 총 페이지 수
   */
  total_page: string;
  /**
   * 법인구분
   */
  corp_cls: string;
  /**
   * 종목명(법인명)
   */
  corp_name: string;
  /**
   * 고유번호
   */
  corp_code: string;
  /**
   * 종목코드
   */
  stock_code: string;
  /**
   * 보고서명
   */
  report_nm: string;
  /**
   * 접수번호
   */
  rcept_no: string;
  /**
   * 공시 제출인명
   */
  flr_nm: string;
  /**
   * 접수일자
   */
  rcept_dt: string;
  /**
   * 비고
   */
  rm: string;
}

export class ListAPI {}
