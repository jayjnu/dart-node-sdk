import { ListAPI, ListRequest, ListResponse } from '~/api/list.api';

export class ListModel {
  constructor(private api: ListAPI) {}

  async getList(request: ListRequest): Promise<ListResponse> {
    return this.api.getJSON(request);
  }
}

export class ListBuilder {
  private corp_code?: string;
  private bgn_de?: string;
  private end_de?: string;
  private last_reprt_at?: string;
  private pblntf_ty?: string;
  private pblntf_detail_ty?: string;
  private corp_cls?: string;
  private sort?: string;
  private sort_mth?: string;
  private page_no?: string;
  private page_count?: string;

  setCorpCode(corpCode: string): ListBuilder {
    this.corp_code = corpCode;
    return this;
  }

  setStartDate(startDate: string): ListBuilder {
    this.bgn_de = startDate;
    return this;
  }

  setEndDate(endDate: string): ListBuilder {
    this.end_de = endDate;
    return this;
  }

  setLastReportAt(lastReportAt: string): ListBuilder {
    this.last_reprt_at = lastReportAt;
    return this;
  }

  setDisclosureType(disclosureType: string): ListBuilder {
    this.pblntf_ty = disclosureType;
    return this;
  }

  setDisclosureDetailType(disclosureDetailType: string): ListBuilder {
    this.pblntf_detail_ty = disclosureDetailType;
    return this;
  }

  setCorporationType(corporationType: string): ListBuilder {
    this.corp_cls = corporationType;
    return this;
  }

  setSort(sort: string): ListBuilder {
    this.sort = sort;
    return this;
  }

  setSortMethod(sort: string): ListBuilder {
    this.sort_mth = sort;
    return this;
  }

  setPageNumber(pageNumber: string): ListBuilder {
    this.page_no = pageNumber;
    return this;
  }

  setPageCount(pageCount: string): ListBuilder {
    this.page_count = pageCount;
    return this;
  }

  build(): ListRequest {
    return {
      corp_code: this.corp_code,
      bgn_de: this.bgn_de,
      end_de: this.end_de,
      last_reprt_at: this.last_reprt_at,
      pblntf_ty: this.pblntf_ty,
      pblntf_detail_ty: this.pblntf_detail_ty,
      corp_cls: this.corp_cls,
      sort: this.sort,
      sort_mth: this.sort_mth,
      page_no: this.page_no,
      page_count: this.page_count,
    };
  }
}
