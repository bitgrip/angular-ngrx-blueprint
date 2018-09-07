import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromActions from '../actions/todo.actions';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../models/todo';


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class TodoEffects {

  constructor(private actions$: Actions, private todoService: TodoService) {
  }

  @Effect()
  loadTodos$: Observable<Action> = this.actions$.pipe(
    ofType<fromActions.LoadTodos>(fromActions.TodoActionTypes.LOAD_TODOS),
    /*
    * switchMap - we know that we get an angular http observable from the service
    * this observable is "cancellable", so if we hit the network request two times
    * only the newer request will be subscribed
    */
    switchMap(() =>
      this.todoService
        .getTodos()
        .pipe(
          map((data: ITodo[]) => new fromActions.LoadTodosSuccess({todos: data})),
          catchError(error => of(new fromActions.LoadTodosFailed(error)))
        )
    )
  );
}
