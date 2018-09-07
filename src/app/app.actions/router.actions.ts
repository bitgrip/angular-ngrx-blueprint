import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

/**
 * Navigation actions are not provided as part of the router package.
 * So we provide own custom navigation actions that use the Router within effects to navigate.
 *
 * for example:
 * store.dispatch(new RouterActions.Go({
 *   path: ['/path', { routeParam: 1 }],
 *   query: { page: 1 },
 *   extras: { replaceUrl: false }
 * });
 * store.dispatch(new RouterActions.Back());
 * store.dispatch(new RouterActions.Forward());
 *
 */

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {
  readonly type = GO;

  constructor(public payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }) {
  }
}

export class Back implements Action {
  readonly type = BACK;
}

export class Forward implements Action {
  readonly type = FORWARD;
}

export type RouterActionsUnion =
  | Go
  | Back
  | Forward;
