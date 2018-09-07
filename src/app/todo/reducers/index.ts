import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromApp from '../../app.reducers';
import * as fromRouter from '@ngrx/router-store';
import * as fromTodo from './todo.reducer';
import { RouterStateUrl } from '../../core/utils/router.utils';


export interface TodoState {
  todos: fromTodo.State;
}

export interface State extends fromApp.State {
  todoState: TodoState;
}

export const reducers: ActionReducerMap<TodoState> = {
  todos: fromTodo.reducer
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(private store: Store<State>) {
 *     this.items$ = store.pipe(select(selectAllItems));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectTodoState = createFeatureSelector<TodoState>('todoState');

/**
 * Todos Selectors
 *
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectTodoEntitiesState = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

/**
 *
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: selectTodoIds,
  selectEntities: selectTodoEntities,
  selectAll: selectAllTodos,
  selectTotal: selectTodosTotal,
} = fromTodo.adapter.getSelectors(selectTodoEntitiesState);

/**
 * These selectors are needed for data "Loading / Loaded"
 */
export const selectTodosLoaded = createSelector(
  selectTodoEntitiesState,
  fromTodo.getLoaded
);
export const selectTodosLoading = createSelector(
  selectTodoEntitiesState,
  fromTodo.getLoading
);

/**
 * Router Selectors (router params, current url)
 *
 */
export const selectRouter = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');

export const selectRouterState = createSelector(
  selectRouter,
  (state: fromRouter.RouterReducerState<RouterStateUrl>) => state.state
);
export const selectRouterQueryParams = createSelector(
  selectRouterState,
  (state: RouterStateUrl) => state.queryParams
);
