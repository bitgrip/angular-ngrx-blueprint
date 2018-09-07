import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromApp from '../../app.reducers';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../../core/utils/router.utils';


export interface StartState {
}

export interface State extends fromApp.State {
  startState: StartState;
}

export const reducers: ActionReducerMap<StartState> = {
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
export const selectStartState = createFeatureSelector<StartState>('startState');


export const selectRouter = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>('router');


/**
 * Router Selectors (router params, current url)
 *
 */
export const selectRouterState = createSelector(
  selectRouter,
  (state: fromRouter.RouterReducerState<RouterStateUrl>) => state.state
);
export const selectRouterQueryParams = createSelector(
  selectRouterState,
  (state: RouterStateUrl) => state.queryParams
);
