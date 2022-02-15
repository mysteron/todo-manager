import { Observable } from 'rxjs';
import { Category } from '../model/Category';
import { ICrudService } from './ICrudStore';

export abstract class AbstractCategoryStore implements ICrudService<Category> {
  abstract getAll(): Observable<Category[]>;
  abstract getById(id: number): Observable<Category>;
  abstract add(entity: Category): Observable<void>;
  abstract remove(id: number): Observable<void>;
  abstract update(entity: Category): Observable<Category>;
}
