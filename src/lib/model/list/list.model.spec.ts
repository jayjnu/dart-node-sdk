import { ListBuilder, ListModel } from './list.model';

describe('ListModel', () => {
  it('should be defined', () => {
    expect(ListModel).toBeDefined();
  });

  describe('request', () => {
    it('고유 번호', () => {
      const CORP_CODE = 'corp_code_sample';
      const request = new ListBuilder().setCorpCode(CORP_CODE).build();
      expect(request).toEqual({
        corp_code: CORP_CODE,
      });
    });
    it('시작일', () => {
      const START_DATE = 'start_date_sample';
      const request = new ListBuilder().setStartDate(START_DATE).build();
      expect(request).toEqual({
        bgn_de: START_DATE,
      });
    });
    it('종료일', () => {
      const END_DATE = 'end_date_sample';
      const request = new ListBuilder().setEndDate(END_DATE).build();
      expect(request).toEqual({
        end_de: END_DATE,
      });
    });
    it('최종보고서 검색여부', () => {
      const LAST_REPORT_AT = 'last_report_at_sample';
      const request = new ListBuilder().setLastReportAt(LAST_REPORT_AT).build();
      expect(request).toEqual({
        last_reprt_at: LAST_REPORT_AT,
      });
    });
    it('공시유형', () => {
      const DISCLOSURE_TYPE = 'disclosure_type_sample';
      const request = new ListBuilder()
        .setDisclosureType(DISCLOSURE_TYPE)
        .build();
      expect(request).toEqual({
        pblntf_ty: DISCLOSURE_TYPE,
      });
    });
    it('공시상세유형', () => {
      const DISCLOSURE_DETAIL_TYPE = 'disclosure_detail_type_sample';
      const request = new ListBuilder()
        .setDisclosureDetailType(DISCLOSURE_DETAIL_TYPE)
        .build();
      expect(request).toEqual({
        pblntf_detail_ty: DISCLOSURE_DETAIL_TYPE,
      });
    });
    it('법인구분', () => {
      const CORPORATION_TYPE = 'corporation_type_sample';
      const request = new ListBuilder()
        .setCorporationType(CORPORATION_TYPE)
        .build();
      expect(request).toEqual({
        corp_cls: CORPORATION_TYPE,
      });
    });
    it('정렬', () => {
      const SORT = 'sort_sample';
      const request = new ListBuilder().setSort(SORT).build();
      expect(request).toEqual({
        sort: SORT,
      });
    });
    it('정렬방법', () => {
      const SORT_METHOD = 'sort_method_sample';
      const request = new ListBuilder().setSortMethod(SORT_METHOD).build();
      expect(request).toEqual({
        sort_mth: SORT_METHOD,
      });
    });
    it('페이지 번호', () => {
      const PAGE_NUMBER = 'page_number_sample';
      const request = new ListBuilder().setPageNumber(PAGE_NUMBER).build();
      expect(request).toEqual({
        page_no: PAGE_NUMBER,
      });
    });
    it('페이지 별 건수', () => {
      const PAGE_COUNT = 'page_count_sample';
      const request = new ListBuilder().setPageCount(PAGE_COUNT).build();
      expect(request).toEqual({
        page_count: PAGE_COUNT,
      });
    });
  });
});
