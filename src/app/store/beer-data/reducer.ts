import { createEntityAdapter, Dictionary, EntityAdapter, EntityState } from "@ngrx/entity";
import { HttpErrorResponse } from "@angular/common/http";
import { Action, createReducer, on } from "@ngrx/store";

import { Beer } from "@app/types/beers";
import {loadFailure, loadRequest, loadSuccess} from "./actions"

export interface BeerState extends EntityState<Beer> {
  loading: boolean;
  loaded: boolean;
  ids: Array<number>;
  entity: Beer | null;
  error: HttpErrorResponse | null
  entities: Dictionary<Beer>
}

export const defaultBeer: BeerState = {
  error: null,
  ids: [],
  entities: {},
  entity: null,
  loaded: false,
  loading: false
}

export const BeerAdaptor: EntityAdapter<Beer> = createEntityAdapter<Beer>();

export const initialState: BeerState = BeerAdaptor.getInitialState(
    defaultBeer
);

const featureReducer = createReducer(
  initialState,
  on(
    loadRequest,
    (state) => ({
      ...state,
      loading: true,
      loaded: false
    })
  ),
  on(
    loadFailure,
    (state, { error}) => ({
      ...state,
      error,
      loading: false,
      loaded: false
    })
  ),
  on(loadSuccess, (state, { data}) =>
  BeerAdaptor.setAll(data, {
      ...state,
      loaded: true,
      loading: false
    })
  )
)

export function reducer(state: BeerState | undefined, action: Action) {
  return featureReducer(state, action);
}

export const reducers = {
    beer: reducer
}