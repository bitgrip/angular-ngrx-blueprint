import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { RouterEffects } from './router.effects';
import { RouterTestingModule } from '@angular/router/testing';

describe('RouterEffects', () => {
  let actions$: Observable<any>;
  let effects: RouterEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        RouterEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(RouterEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
