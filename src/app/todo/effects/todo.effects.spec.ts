import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { TodoEffects } from './todo.effects';
import { TodoService, MockTodoService } from '../services/todo.service';
import * as fromActions from '../actions/todo.actions';

/**
 * Refer to 'Writing Marble Tests' for details on '--a-' syntax
 *
 * https://github.com/ReactiveX/rxjs/blob/master/doc/writing-marble-tests.md
 */

describe('TodoEffects', () => {
  let actions$: Observable<any>;
  let effects: TodoEffects;
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoEffects,
        {provide: TodoService, useClass: MockTodoService},
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TodoEffects);
    service = TestBed.get(TodoService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should stream todos data successfully', () => {
    const action = new fromActions.LoadTodos();
    const completion = new fromActions.LoadTodosSuccess(
      {todos: MockTodoService.TODOS_MOCKDATA.todos}
    );

    actions$ = hot('--a-', {a: action});
    const expected = cold('--b', {b: completion});

    expect(effects.loadTodos$).toBeObservable(expected);
  });

  it('should fail the todos data stream', () => {
    const error = 'Error occurred!';
    const action = new fromActions.LoadTodos();
    const completion = new fromActions.LoadTodosFailed(error);

    actions$ = hot('-a', {a: action});
    const response = cold('-#', {}, error);
    const expected = cold('--c', { c: completion });

    spyOn(service, 'getTodos').and.returnValue(response);
    expect(effects.loadTodos$).toBeObservable(expected);
  });
});
