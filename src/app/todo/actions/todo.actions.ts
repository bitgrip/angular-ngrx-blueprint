import { Action } from '@ngrx/store';
import { ITodo } from '../models/todo';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export enum TodoActionTypes {
  LOAD_TODOS = '[Todo] Load Todos',
  LOAD_TODOS_SUCCESS = '[Todo] Load Todos Success',
  LOAD_TODOS_FAILED = '[Todo] Load Todos Failed',
  ADD_TODO = '[Todo] Add Todo',
  TOGGLE_TODO_COMPLETE = '[Todo] Toggle Todo Complete By Id',
  REMOVE_TODO = '[Todo] Remove Todo By Id'
}

/**
 * Load Todos Actions
 */
export class LoadTodos implements Action {
  readonly type = TodoActionTypes.LOAD_TODOS;
}

export class LoadTodosSuccess implements Action {
  readonly type = TodoActionTypes.LOAD_TODOS_SUCCESS;

  constructor(public payload: { todos: ITodo[] }) {
  }
}

export class LoadTodosFailed implements Action {
  readonly type = TodoActionTypes.LOAD_TODOS_FAILED;

  constructor(public payload: any) {
  }
}

export class ToggleTodoComplete implements Action {
  readonly type = TodoActionTypes.TOGGLE_TODO_COMPLETE;

  constructor(public payload: { todo: ITodo }) {
  }
}

export class AddTodo implements Action {
  readonly type = TodoActionTypes.ADD_TODO;

  constructor(public payload: { todo: ITodo }) {
  }
}

export class RemoveTodo implements Action {
  readonly type = TodoActionTypes.REMOVE_TODO;

  constructor(public payload: { id: number }) {
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type TodoActionsUnion =
  | LoadTodos
  | LoadTodosSuccess
  | LoadTodosFailed
  | ToggleTodoComplete
  | AddTodo
  | RemoveTodo;
