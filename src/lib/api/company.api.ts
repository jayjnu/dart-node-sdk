import HttpClient from '~/util/http.util';

export interface CompanyRequest {
  corp_code: string;
}

export enum CorpClass {
  KOSPI = 'T',
  KOSDAQ = 'K',
  KONEX = 'N',
  ETC = 'E',
}

export interface CompanyResponse {
  /**
   * 에러 및 정보 코드
   */
  status: string;
  /**
   * 에러 및 정보 메시지
   */
  message: string;
  /**
   * 정식명칭
   */
  corp_name: string;
  /**
   * 영문명칭
   */
  corp_name_eng: string;
  /**
   * 종목명(상장사) 또는 약식명칭(기타법인)
   */
  stock_name: string;
  /**
   * 상장회사의 종목코드(6자리)
   */
  stock_code: string;
  /**
   * 대표자명
   */
  ceo_nm: string;
  /**
   * 법인구분 : Y(유가), K(코스닥), N(코넥스), E(기타)
   */
  corp_cls: CorpClass;
  /**
   * 법인등록번호
   */
  jurir_no: string;
  /**
   * 사업자등록번호
   */
  bizr_no: string;
  /**
   * 주소
   */
  adres: string;
  /**
   * 홈페이지
   */
  hm_url: string;
  /**
   * IR홈페이지
   */
  ir_url: string;
  /**
   * 전화번호
   */
  phn_no: string;
  /**
   * 팩스번호
   */
  fax_no: string;
  /**
   * 업종코드
   */
  induty_code: string;
  /**
   * 설립일(YYYYMMDD)
   */
  est_dt: string;
  /**
   * 결산월(MM)
   */
  acc_mt: string;
}

export class CompanyAPI {
  private endpoint = 'company.json';
  constructor(private http: HttpClient) {}

  async getJSON(params: CompanyRequest): Promise<CompanyResponse> {
    // TODO Question
    // return this.http.getJSON(query); 를 하면
    // `Typescript: Index signature is missing in type` 라고 나옴. 해결 가능한건지?
    return this.http.getJSON(this.endpoint, { ...params });
  }
}
