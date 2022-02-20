import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Category } from 'src/app/model/Category';
import { TaskStatus, TodoTask } from 'src/app/model/TodoTask';

@Component({
  selector: 'app-todo-note',
  templateUrl: './todo-note.component.html',
  styleUrls: ['./todo-note.component.scss'],
})
export class TodoNoteComponent implements OnInit {
  TaskStatus = TaskStatus;
  private _editing = false;

  @Input()
  loading = false;

  @Input()
  task: TodoTask = {} as TodoTask;

  @Input()
  get editing() {
    return this._editing;
  }

  @Output()
  editingChange = new EventEmitter<boolean>();

  set editing(val) {
    this._editing = val;
    this.editingChange.emit(this._editing);
  }

  @Input()
  categoryTitle = '';

  @Input()
  categories: Category[] = [];

  @Output()
  delete: EventEmitter<TodoTask> = new EventEmitter<TodoTask>();

  @Output()
  changeStatus: EventEmitter<{ task: TodoTask; status: TaskStatus }> =
    new EventEmitter();

  @Output()
  update: EventEmitter<TodoTask> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  fireChangeStatus(task: TodoTask, $event: any) {
    this.changeStatus.emit({
      task,
      status: $event.srcElement.checked
        ? TaskStatus.Done
        : TaskStatus.InProgress,
    });
  }

  fireDelete(task: TodoTask) {
    this.delete.emit(task);
  }

  fireUpdate(task: TodoTask) {
    this.update.emit(task);
  }
}
