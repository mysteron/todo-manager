import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoNoteListComponent } from './components/todo-note-list/todo-note-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpAuthInterceptor } from './services/interceptors/http-auth-interceptor';
import { AbstractCategoryStore } from './services/AbstractCategoryStore.service';
import { MockCategoryService } from './services/MockCategoryStore.service';
import { AbstractTaskStore } from './services/AbstractTaskStore.service';
import { MockTaskStoreService } from './services/MockTaskStore.service';
import { TodoNoteComponent } from './components/todo-note/todo-note.component';
import { CategoryComponent } from './components/category/category.component';

@NgModule({
  declarations: [AppComponent, TodoNoteListComponent, CategoryListComponent, TodoNoteComponent, CategoryComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },
    {
      provide: AbstractCategoryStore,
      useClass: MockCategoryService,
    },
    {
      provide: AbstractTaskStore,
      useClass: MockTaskStoreService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
