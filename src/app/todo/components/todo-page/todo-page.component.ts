import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromActions from '../../actions/todo.actions';
import * as fromTodo from '../../reducers';
import { ITodo } from '../../models/todo';

@Component({
  selector: 'app-todo-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class TodoPageComponent implements OnInit {
  todos$: Observable<ITodo[]>;
  todosTotal$: Observable<number>;

  constructor(private store: Store<fromTodo.State>) {
  }

  ngOnInit() {
    // load all todos from our data json
    this.todos$ = this.store.pipe(select(fromTodo.selectAllTodos));
    this.todosTotal$ = this.store.pipe(select(fromTodo.selectTodosTotal));
    this.store.dispatch(new fromActions.LoadTodos());
  }

  OnAddTodo(event) {
    this.todosTotal$.pipe(take(1)).subscribe(total => {
      const todo: ITodo = {
        id: total + 1,
        title: event.target.value,
        complete: false
      };
      this.store.dispatch(new fromActions.AddTodo({todo}));

      event.target.value = '';
    });
  }

  OnToggleTodoComplete(todo) {
    this.store.dispatch(new fromActions.ToggleTodoComplete({todo}));
  }

  onRemoveTodo(id) {
    this.store.dispatch(new fromActions.RemoveTodo({id}));
  }

}
