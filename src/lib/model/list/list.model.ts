import { ListAPI, ListResponse } from '~/api/list.api';

export class ListModel {
  constructor(private api: ListAPI) {}

  async getList(): Promise<ListResponse> {
    const res = await this.api.getJSON();

    // TODO: 구현 필요

    return res;
  }
}
