import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Beer } from '@app/types/beers';

export enum BeerActionTypes {
  GET_DATA = '[BEER] Get BeerData data',
  GET_DATA_SUCCESS = '[BEER] Get Beer data Success',
  GET_DATA_FAIL = '[BEER] Get Beer data Fail',
}

export const loadRequest = createAction(
  BeerActionTypes.GET_DATA,
  props<{ page: number; amount: number }>()
);

export const loadFailure = createAction(
  BeerActionTypes.GET_DATA_FAIL,
  props<{ error: HttpErrorResponse }>()
);

export const loadSuccess = createAction(
  BeerActionTypes.GET_DATA_SUCCESS,
  props<{ data: Beer[] }>()
);
