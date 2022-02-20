import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../model/Category';
import { AbstractCategoryStore } from './AbstractCategoryStore.service';
import { AbstractHttpService } from './AbstractHttpService';

@Injectable()
export class HttpCategoryService
  extends AbstractHttpService
  implements AbstractCategoryStore
{
  constructor(protected http: HttpClient) {
    super('categories');
  }

  getAll(): Observable<Category[]> {
    const url = super.constructUrl();
    return this.http.get<any>(url).pipe(
      map((res) => {
        return (res as any[]).map(HttpCategoryService.MapApiCategoryToCategory);
      })
    );
  }
  getById(id: number): Observable<Category> {
    const url = super.constructUrl(id);
    return this.http.get<any>(url).pipe(
      map((res) => {
        return HttpCategoryService.MapApiCategoryToCategory(res as any);
      })
    );
  }
  add(entity: Category): Observable<Category> {
    const url = super.constructUrl();
    const body = JSON.stringify(
      HttpCategoryService.MapCategoryToApiCategory(entity)
    );
    return this.http.post<any>(url, body).pipe(
      map((res) => {
        return HttpCategoryService.MapApiCategoryToCategory(res as any);
      })
    );
  }
  remove(id: number): Observable<any> {
    const url = super.constructUrl(id);
    return this.http.delete(url);
  }

  update(entity: Category): Observable<Category> {
    const url = super.constructUrl(entity.id);
    const body = JSON.stringify(
      HttpCategoryService.MapCategoryToApiCategory(entity)
    );
    return this.http.put<any>(url, body).pipe(
      map((res) => {
        return HttpCategoryService.MapApiCategoryToCategory(res as any);
      })
    );
  }

  public static MapApiCategoryToCategory(apiCategory: any): Category {
    return {
      id: apiCategory.id,
      title: apiCategory.name,
      description: apiCategory.description,
    } as Category;
  }

  public static MapCategoryToApiCategory(category: Category): any {
    return {
      id: category.id || undefined,
      name: category.title,
      description: category.description,
      owner: `/api/users/1`,
    };
  }
}
