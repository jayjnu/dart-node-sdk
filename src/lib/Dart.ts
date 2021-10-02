import { ListModel } from './model/list/list.model';
import { CorpCodeAPI } from './api/corp-code.api';
import { CorpCodeModel } from './model/corp-code/corp-code.model';
import HttpClient from './util/http.util';
import { XMLHandler } from './util/xml-handler.util';
import { ListAPI } from './api/list.api';

export class Dart {
  private httpClient: HttpClient;

  readonly corpCode: CorpCodeModel;
  readonly list: ListModel;

  constructor(cert_key: string) {
    this.httpClient = new HttpClient(cert_key);
    this.corpCode = new CorpCodeModel(
      new CorpCodeAPI(this.httpClient, new XMLHandler())
    );
    this.list = new ListModel(new ListAPI(this.httpClient));
  }

  async init(): Promise<void> {
    await this.corpCode.getCorpCodes();
  }
}
