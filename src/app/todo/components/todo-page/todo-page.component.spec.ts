import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromApp from '../../../app.reducers';
import * as fromTodo from '../../reducers';

import { TodoPageComponent } from './todo-page.component';


describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot({
          ...fromApp.reducers,
          todoState: combineReducers(fromTodo.reducers),
        }),
      ],
      declarations: [ TodoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
