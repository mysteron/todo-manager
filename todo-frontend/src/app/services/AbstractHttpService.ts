import { environment } from 'src/environments/environment';

export class AbstractHttpService {
  constructor(protected entityName: string) {}
  private baseUrl = environment.apiBaseUrl;
  protected constructUrl(id?: string | number) {
    return `${this.baseUrl}${this.entityName}` + (id ? `/${id}` : '');
  }
}
