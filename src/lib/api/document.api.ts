import type { HttpClient } from '~/util/http.util';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DocumentRequest {
  crtfc_key: string;

  /**
   * 접수번호
   */
  rcept_no: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DocumentResponse {}

export class DocumentAPI {
  constructor(private http: HttpClient, private cert_key: string) {}

  fetch(rcept_no: string): Promise<Buffer> {
    return this.http
      .get('document.xml', {
        searchParams: {
          crtfc_key: this.cert_key,
          rcept_no,
        },
      })
      .buffer();
  }
}
