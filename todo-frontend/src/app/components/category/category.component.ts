import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/model/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  private _editing = false;
  constructor() {}

  @Input()
  category: Category = {} as Category;

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

  @Output()
  delete: EventEmitter<Category> = new EventEmitter<Category>();

  @Output()
  update: EventEmitter<Category> = new EventEmitter();

  ngOnInit(): void {}

  fireDelete(task: Category) {
    this.delete.emit(task);
  }

  fireUpdate(task: Category) {
    this.update.emit(task);
  }
}
