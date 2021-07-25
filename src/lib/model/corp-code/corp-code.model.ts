import type { Corp, CorpCodeAPI } from '~/api/corp-code.api';

type CorpSearchOptions = {
  exact?: boolean;
};

export class CorpCodeModel {
  constructor(private api: CorpCodeAPI) {}

  // TODO: 구현 필요
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getCorpByName(
    name: string,
    options?: CorpSearchOptions
  ): Promise<Corp[]> {
    const res = await this.api.getJSON();

    const isExactMatch = (corp: Corp) => corp.corp_name === name;
    const isPartialMatch = (corp: Corp) => corp.corp_name.includes(name);
    const match = options?.exact ? isExactMatch : isPartialMatch;

    return res.result.list.filter(match);
  }
}
