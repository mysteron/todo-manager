import { Observable } from 'rxjs';
import { TodoTask } from '../model/TodoTask';
import { ICrudService } from './ICrudStore';

export abstract class AbstractTaskStore implements ICrudService<TodoTask> {
  abstract getAll(): Observable<TodoTask[]>;
  abstract getById(id: number): Observable<TodoTask>;
  abstract add(entity: TodoTask): Observable<void>;
  abstract remove(id: number): Observable<void>;
  abstract update(entity: TodoTask): Observable<TodoTask>;
}
