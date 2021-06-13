import type { HttpClient } from '~/util/http.util';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CorpCodeRequest {
  cert_key: string;
}

export interface Corp {
  corp_code: number;
  corp_name: string;
  stock_code: string;
  modify_date: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CorpCodeResponse {
  status: string;
  message: string;
  result: {
    list: Corp[];
  };
}

export interface XMLHandler<T> {
  fromZipBuffer(buffer: Buffer): XMLHandlingProcess<T>;
}

export interface XMLHandlingProcess<T> {
  json(): Promise<T>;
}

export class CorpCodeAPI {
  constructor(
    private http: HttpClient,
    private cert_key: string,
    private xmlHandler: XMLHandler<CorpCodeResponse>
  ) {}

  async getJSON(): Promise<CorpCodeResponse> {
    const zippedXML = await this.fetch().buffer();
    const json = await this.xmlHandler.fromZipBuffer(zippedXML).json();

    return json;
  }

  private fetch() {
    return this.http.get('corpCode.xml', {
      searchParams: {
        cert_key: this.cert_key,
      },
    });
  }
}
