import { Observable } from "rxjs";

export interface ICrudService<T> {
  getAll(): Observable<T[]>;
  getById(id: number): Observable<T>;
  add(entity: T): Observable<T>;
  remove(id: number): Observable<void>;
  update(entity: T): Observable<T>;
}
