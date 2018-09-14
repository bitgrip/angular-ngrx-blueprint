import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as fromActions from '../actions/todo.actions';
import { ITodo } from '../models/todo';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<ITodo> {
  // additional entities state properties
  loaded: boolean;
  loading: boolean;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<ITodo> = createEntityAdapter<ITodo>({
  sortComparer: false,
});

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  loaded: false,
  loading: false,
});

export function reducer(state = initialState, action: fromActions.TodoActionsUnion): State {
  switch (action.type) {

    case fromActions.TodoActionTypes.LOAD_TODOS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromActions.TodoActionTypes.LOAD_TODOS_SUCCESS: {
      /**
       * The addAll function provided by the created adapter
       * replace the current records in dictionary with the provided records
       * and returns a new state including those records. If
       * the collection is to be sorted, the adapter will
       * sort each record upon entry into the sorted array.
       */
      return adapter.addAll(action.payload.todos, {
        ...state,
        loaded: true,
        loading: false
      });
    }

    case fromActions.TodoActionTypes.LOAD_TODOS_FAILED: {
      return adapter.addAll([], {
        ...state,
        loaded: false,
        loading: false
      });
    }

    case fromActions.TodoActionTypes.TOGGLE_TODO_COMPLETE: {
      return adapter.updateOne({
        id: action.payload.todo.id,
        changes: {
          complete: !action.payload.todo.complete
        }
      }, state);
    }

    case fromActions.TodoActionTypes.ADD_TODO: {
      return adapter.addOne(action.payload.todo, state);
    }

    case fromActions.TodoActionTypes.REMOVE_TODO: {
      return adapter.removeOne(action.payload.id, state);
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into that database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
