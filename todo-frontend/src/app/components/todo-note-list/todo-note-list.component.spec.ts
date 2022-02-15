import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoNoteListComponent } from './todo-note-list.component';

describe('TodoNoteListComponent', () => {
  let component: TodoNoteListComponent;
  let fixture: ComponentFixture<TodoNoteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoNoteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoNoteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
