import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../model/Category';
import { AbstractCategoryStore } from './AbstractCategoryStore.service';
import { TodoTask } from '../model/TodoTask';

import * as fakeCategories from '../../assets/data/categories.json';
import * as fakeTodoTasks from '../../assets/data/todo-tasks.json';

@Injectable()
export class MockCategoryService implements AbstractCategoryStore {
  private categories: Category[] = [];
  private todoTasks: TodoTask[] = [];
  constructor() {
    this.categories = JSON.parse(JSON.stringify(fakeCategories))
      .items as Category[];
    this.todoTasks = JSON.parse(JSON.stringify(fakeTodoTasks))
      .items as TodoTask[];
  }

  getAll(): Observable<Category[]> {
    return of(this.categories);
  }
  getById(id: number): Observable<Category> {
    const found = this.categories.find((t) => t.id === id);
    if (!found) {
      throw new Error('Not found');
    }
    return of(found);
  }
  add(category: Category): Observable<Category> {
    category.id = Math.max(...this.categories.map((t) => t.id)) + 1;
    this.categories.push(category);
    return of(category);
  }
  remove(id: number): Observable<void> {
    this.categories = this.categories.filter((t) => t.id !== id);
    return of(void 0);
  }
  update(category: Category): Observable<Category> {
    const foundIndex = this.categories.findIndex((t) => t.id === category.id);
    if (foundIndex < 0) {
      throw new Error('Not found');
    }
    this.categories[foundIndex] = category;
    return of(category);
  }

  getByCategoryId(catId: number): Observable<TodoTask[]> {
    return of(this.todoTasks.filter((t) => t.categoryId === catId));
  }
}
