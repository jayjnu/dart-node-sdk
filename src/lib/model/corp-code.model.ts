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
    return [];
  }
}
