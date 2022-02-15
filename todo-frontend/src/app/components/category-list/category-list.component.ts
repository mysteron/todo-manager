import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category';
import { AbstractCategoryStore } from 'src/app/services/AbstractCategoryStore.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading = false;
  isAdding = false;
  showDone = true;
  newCategory: Category = {} as Category;
  isEditing: Record<number, boolean> = {};
  errorDescription: string | undefined = undefined;
  constructor(protected categoryStore: AbstractCategoryStore) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.errorDescription = undefined;
    this.categoryStore.getAll().subscribe({
      next: (cats) => {
        this.categories = cats;
        this.loading = false;
      },
      error: (e: Error) => {
        this.errorDescription = e.message;
      },
    });
  }

  toggleEditMode(taskId: number, enabled: boolean) {
    this.isEditing[taskId] = enabled;
  }

  updateCategory(category: Category) {
    this.loading = true;
    this.categoryStore.update(category).subscribe({
      next: () => {
        this.toggleEditMode(category.id, false);
        this.loadData();
      },
      error: (e: Error) => {
        this.errorDescription = e.message;
      },
    });
  }

  deleteCategory(category: Category) {
    this.loading = true;
    this.categoryStore.remove(category.id).subscribe({
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
    this.categoryStore.add(this.newCategory).subscribe({
      next: () => {
        this.cancelNew();
        this.loadData();
      },
      error: (e: Error) => {
        this.errorDescription = e.message;
      },
    });
  }

  cancelNew() {
    this.isAdding = false;
    this.newCategory = {} as Category;
  }
}
