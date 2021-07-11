import HttpClient from '../util/http.util';

export interface DocumentRequest {
  /**
   * 접수번호
   */
  rcept_no: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DocumentResponse {}

export class DocumentAPI {
  private endpoint = 'document.xml';
  constructor(private http: HttpClient) {}

  fetch(rcept_no: string): Promise<Buffer> {
    return this.http.fetch(this.endpoint, { rcept_no }).buffer();
  }
}
