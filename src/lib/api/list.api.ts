import { ResponseCommon } from './type';
import HttpClient from '~/util/http.util';

export interface ListRequest {
  /**
   * 고유번호
   */
  corp_code?: string;
  /**
   * 시작일
   */
  bgn_de?: string;
  /**
   * 종료일
   */
  end_de?: string;
  /**
   * 최종보고서 검색여부
   */
  last_reprt_at?: string;
  /**
   * 공시유형
   */
  pblntf_ty?: string;
  /**
   * 공시상세유형
   */
  pblntf_detail_ty?: string;
  /**
   * 법인구분
   */
  corp_cls?: string;
  /**
   * 정렬
   */
  sort?: string;
  /**
   * 정렬방법
   */
  sort_mth?: string;
  /**
   * 페이지 번호
   */
  page_no?: string;
  /**
   * 페이지 별 건수
   */
  page_count?: string;
}

export interface ListResponse extends ResponseCommon {
  /**
   * 페이지 번호
   */
  page_no: number;
  /**
   * 페이지 별 건수
   */
  page_count: number;
  /**
   * 총 건수
   */
  total_count: number;
  /**
   * 총 페이지 수
   */
  total_page: number;
  list: {
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
  }[];
}

export class ListAPI {
  private endpoint = 'list.json';
  constructor(private http: HttpClient) {}

  async getJSON(params?: ListRequest): Promise<ListResponse> {
    return this.http.getJSON(this.endpoint, { ...params });
  }
}
