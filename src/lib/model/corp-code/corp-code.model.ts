import type { Corp, CorpCodeAPI, CorpCodeResponse } from '~/api/corp-code.api';

type CorpSearchOptions = {
  exact?: boolean;
};

export class CorpCodeModel {
  // TODO: 별도의 캐시 레이어 고도화 필요
  private corpCodes: CorpCodeResponse | null = null;
  constructor(private api: CorpCodeAPI) {}

  async getCorpCodes(): Promise<CorpCodeResponse> {
    if (this.corpCodes) {
      return this.corpCodes;
    }

    const corpCodes = await this.api.getJSON();

    this.corpCodes = corpCodes;

    return corpCodes;
  }

  // TODO: 구현 필요
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCorpByName(
    name: string,
    options?: CorpSearchOptions
  ): Promise<Corp[]> {
    const res = await this.getCorpCodes();

    const isExactMatch = (corp: Corp) => corp.corp_name === name;
    const isPartialMatch = (corp: Corp) => corp.corp_name.includes(name);
    const match = options?.exact ? isExactMatch : isPartialMatch;

    return res.result.list.filter(match);
  }

  clearCache(): void {
    this.corpCodes = null;
  }
}
