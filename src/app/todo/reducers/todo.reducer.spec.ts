import * as fromTodo from './todo.reducer';
import * as fromActions from '../actions/todo.actions';
import { ITodo } from '../models/todo';
import { MockTodoService } from '../services/todo.service';

// “When I dispatch XYZ action, I expect my reducer to return me state that looks like ABC”

describe('Todo Reducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      // identity reducer function
      const result = fromTodo.reducer(fromTodo.initialState, action);

      expect(result).toBe(fromTodo.initialState);
    });
  });

  describe('LOAD_TODOS action', () => {
    it('should set loading to true', () => {
      const initialState = fromTodo.initialState;
      const action = new fromActions.LoadTodos();
      const state = fromTodo.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      // untouched props, good to add regardless
      expect(state.loaded).toEqual(false);
      expect(state.entities).toEqual({});
    });
  });

  describe('LOAD_TODOS_SUCCESS action', () => {
    it('should populate entities from the array', () => {
      const todos: ITodo[] = MockTodoService.TODOS_MOCKDATA.todos;

      const entities = {
        '1': todos[0],
        '2': todos[1]
      };

      const initialState = fromTodo.initialState;
      const action = new fromActions.LoadTodosSuccess({ todos: todos });
      const state = fromTodo.reducer(initialState, action);

      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
      expect(state.entities).toEqual(entities);
    });
  });

  describe('LOAD_TODOS_FAILED action', () => {
    it('should return the previous state', () => {
      const initialState = fromTodo.initialState;
      const previousState = {...initialState, loading: true};
      const action = new fromActions.LoadTodosFailed({});
      const state = fromTodo.reducer(previousState, action);

      expect(state).toEqual(initialState);
    });
  });
});
