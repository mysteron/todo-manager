import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { TaskStatus, TodoTask } from 'src/app/model/TodoTask';
import { AbstractCategoryStore } from 'src/app/services/AbstractCategoryStore.service';
import { AbstractTaskStore } from 'src/app/services/AbstractTaskStore.service';

@Component({
  selector: 'app-todo-note-list',
  templateUrl: './todo-note-list.component.html',
  styleUrls: ['./todo-note-list.component.scss'],
})
export class TodoNoteListComponent implements OnInit {
  tasks: TodoTask[] = [];
  categories: Category[] = [];
  loading = false;
  isAdding = false;
  firstLoading = true;
  showDone = true;
  newTask: TodoTask = {} as TodoTask;
  isEditing: Record<number, boolean> = {};
  errorDescription: string | undefined = undefined;
  TaskStatus = TaskStatus;

  constructor(
    protected todosStore: AbstractTaskStore,
    protected categoryStore: AbstractCategoryStore
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.errorDescription = undefined;
    this.categoryStore.getAll().subscribe({
      next: (cats) => {
        this.categories = cats;
        this.todosStore.getAll().subscribe((tasks) => {
          this.tasks = tasks;
          this.tasks.forEach((t) => {
            this.isEditing[t.id] = false;
            this.isEditing = { ...this.isEditing };
          });
          this.loading = false;
          this.firstLoading = false;
        });
      },
      error: (e: Error) => {
        this.errorDescription = e.message;
        this.firstLoading = false;
      },
    });
  }

  get tasksFiltered() {
    if (this.showDone) {
      return this.tasks;
    } else {
      return this.tasks.filter((t) => t.status !== TaskStatus.Done);
    }
  }

  get isNewOrEditMode() {
    if (Object.values(this.isEditing).length > 0) {
      return (
        this.isAdding || Object.values(this.isEditing).reduce((p, c) => p || c)
      );
    } else {
      return this.isAdding;
    }
  }

  getCategoryTitle(id: number) {
    const found = this.categories.find((c) => c.id === id);
    return found ? found.title : '';
  }

  changeShowDone($event: any) {
    this.showDone = $event.srcElement.checked;
  }

  changeStatus(ev: { task: TodoTask; status: TaskStatus }) {
    this.loading = true;
    ev.task.status = ev.status;
    this.updateTask(ev.task);
  }

  toggleEditMode(taskId: number, enabled: boolean) {
    this.isEditing[taskId] = enabled;
    this.isEditing = { ...this.isEditing };
  }

  updateTask(todoTask: TodoTask) {
    this.loading = true;
    this.todosStore.update(todoTask).subscribe({
      next: () => {
        this.toggleEditMode(todoTask.id, false);
        this.loadData();
      },
      error: (e: Error) => {
        this.errorDescription = e.message;
      },
    });
  }

  deleteTask(todoTask: TodoTask) {
    this.tasks = this.tasks.filter((t) => t.id !== todoTask.id);
    this.loading = true;
    this.todosStore.remove(todoTask.id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (e: Error) => {
        this.errorDescription = e.message;
      },
    });
  }

  toggleAddingMode(enabled: boolean) {
    this.isAdding = enabled;
  }

  saveNew() {
    this.isAdding = false;
    this.tasks.push(this.newTask);
    this.todosStore.add(this.newTask).subscribe({
      next: () => {
        this.loadData();
      },
      error: (e: Error) => {
        this.errorDescription = e.message;
      },
    });
  }

  cancelNew() {
    this.isAdding = false;
    this.newTask = {} as TodoTask;
  }
}
