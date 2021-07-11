import { mapEntries } from '~/util/object.util';
import HttpClient from '~/util/http.util';

export interface Corp {
  corp_code: number;
  corp_name: string;
  stock_code: string;
  modify_date: string;
}

interface BaseCorpCodeResponse<T> {
  status: string;
  message: string;
  result: {
    list: T[];
  };
}

interface XMLItem extends Record<string, string[]> {
  corp_code: string[];
  corp_name: string[];
  stock_code: string[];
  modify_date: string[];
}

export type CorpCodeResponse = BaseCorpCodeResponse<Corp>;

export type XMLParsingResult = BaseCorpCodeResponse<XMLItem>;
export interface XMLHandler<T> {
  fromZipBuffer(buffer: Buffer): XMLHandlingProcess<T>;
}

export interface XMLHandlingProcess<T> {
  json(): Promise<T>;
}

export class CorpCodeAPI {
  private endpoint = 'corpCode.xml';
  constructor(
    private http: HttpClient,
    private xmlHandler: XMLHandler<XMLParsingResult>
  ) {}

  async getJSON(): Promise<CorpCodeResponse> {
    const zippedXML = await this.fetch(this.endpoint).buffer();
    const json = await this.xmlHandler.fromZipBuffer(zippedXML).json();

    return this.normalizeJSON(json);
  }

  private fetch(endpoint: string) {
    return this.http.fetch(endpoint);
  }

  private normalizeJSON(json: XMLParsingResult): CorpCodeResponse {
    return {
      ...json,
      result: {
        ...json.result,
        list: json.result.list.map((item) => {
          return mapEntries<string[], Corp>(item, ([key, value]) => [
            key,
            CorpCodeAPI.flattenValue(value),
          ]);
        }),
      },
    };
  }

  private static flattenValue(values: string[]): string {
    return values.find(() => true)?.trim() || '';
  }
}
