import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TaskStatus, TodoTask } from '../model/TodoTask';
import { AbstractHttpService } from './AbstractHttpService';
import { AbstractTaskStore } from './AbstractTaskStore.service';

@Injectable()
export class HttpTaskStoreService
  extends AbstractHttpService
  implements AbstractTaskStore
{
  constructor(protected http: HttpClient) {
    super('todo_notes');
  }

  getAll(): Observable<TodoTask[]> {
    const url = super.constructUrl();
    return this.http.get<any>(url).pipe(
      map((res) => {
        return (res as any[]).map(HttpTaskStoreService.MapApiTaskToTask);
      })
    );
  }
  getById(id: number): Observable<TodoTask> {
    const url = super.constructUrl(id);
    return this.http.get<any>(url).pipe(
      map((res) => {
        return HttpTaskStoreService.MapApiTaskToTask(res as any);
      })
    );
  }
  add(entity: TodoTask): Observable<TodoTask> {
    const url = super.constructUrl();
    const body = JSON.stringify(HttpTaskStoreService.MapTaskToApiTask(entity));
    return this.http.post<any>(url, body).pipe(
      map((res) => {
        return HttpTaskStoreService.MapApiTaskToTask(res as any);
      })
    );
  }

  remove(id: number): Observable<any> {
    const url = super.constructUrl(id);
    return this.http.delete(url);
  }

  update(entity: TodoTask): Observable<TodoTask> {
    const url = super.constructUrl(entity.id);
    const body = JSON.stringify(HttpTaskStoreService.MapTaskToApiTask(entity));
    return this.http.put<any>(url, body).pipe(
      map((res) => {
        return HttpTaskStoreService.MapApiTaskToTask(res as any);
      })
    );
  }

  public static MapApiTaskToTask(apiTask: any): TodoTask {
    return {
      id: apiTask.id,
      title: apiTask.title,
      description: apiTask.description,
      categoryId: apiTask.category.id,
      status: apiTask.completed ? TaskStatus.Done : TaskStatus.InProgress,
    } as TodoTask;
  }

  public static MapTaskToApiTask(task: TodoTask): any {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      category: `/api/categories/${task.categoryId}`,
      owner: `/api/users/1`,
      completed: task.status === TaskStatus.Done,
    };
  }
}
