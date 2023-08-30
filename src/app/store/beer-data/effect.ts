import { catchError, map, mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { loadRequest, loadFailure, loadSuccess } from './actions';
import { Beer } from '@app/types/beers';
import { PunkApiService } from '@app/services/punk-api/punk-api.service';

@Injectable()
export class BeerEffect {
  constructor(private action$: Actions, private service: PunkApiService) {}

  loadRequestEffect$ = createEffect(() => {
    return this.action$.pipe(
      ofType(loadRequest),
      mergeMap((action) => {
        return this.service.getBeers(action.page, action.amount).pipe(
          map((data: Beer[]) => loadSuccess({ data })),
          catchError((error) => of(loadFailure(error)))
        );
      })
    );
  });
}

export const effects = [BeerEffect];
