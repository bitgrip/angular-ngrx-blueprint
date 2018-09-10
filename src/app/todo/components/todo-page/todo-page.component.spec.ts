import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { combineReducers, Store, StoreModule } from '@ngrx/store';

import * as fromApp from '../../../app.reducers';
import * as fromTodo from '../../reducers';
import * as fromActions from '../../actions/todo.actions';

import { MockTodoService } from '../../services/todo.service';
import { TodoPageComponent } from './todo-page.component';

/**
 * Providing Store for testing
 *
 * https://github.com/ngrx/platform/blob/master/docs/store/testing.md
 */

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;
  let store: Store<fromTodo.State>;

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
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load data when created', () => {
    const action = new fromActions.LoadTodos();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should total the list of items after the data is loaded', () => {
    const items = MockTodoService.TODOS_MOCKDATA.todos;
    const action = new fromActions.LoadTodosSuccess({todos: items});

    store.dispatch(action);

    component.todosTotal$.subscribe(count => {
      expect(count).toBe(items.length);
    });
  });
});
