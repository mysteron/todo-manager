import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TodoTask } from '../model/TodoTask';
import { AbstractTaskStore } from './AbstractTaskStore.service';

import * as fakeData from '../../assets/data/todo-tasks.json';

@Injectable()
export class MockTaskStoreService implements AbstractTaskStore {
  private tasks: TodoTask[] = [];
  constructor() {
    this.tasks = JSON.parse(JSON.stringify(fakeData)).items as TodoTask[];
  }
  getAll(): Observable<TodoTask[]> {
    return of(this.tasks);
  }
  getById(id: number): Observable<TodoTask> {
    const found = this.tasks.find((t) => t.id === id);
    if (!found) {
      throw new Error('Not found');
    }
    return of(found);
  }
  add(task: TodoTask): Observable<TodoTask> {
    task.id = Math.max(...this.tasks.map((t) => t.id)) + 1;
    this.tasks.push(task);
    return of(task);
  }
  remove(id: number): Observable<void> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return of(void 0);
  }
  update(task: TodoTask): Observable<TodoTask> {
    const foundIndex = this.tasks.findIndex((t) => t.id === task.id);
    if (foundIndex < 0) {
      throw new Error('Not found');
    }
    this.tasks[foundIndex] = task;
    return of(task);
  }
}
