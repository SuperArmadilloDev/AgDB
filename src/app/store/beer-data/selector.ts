import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Beer } from "@app/types/beers";
import { BeerAdaptor, BeerState } from "./reducer";

export const getFeatureState = createFeatureSelector<Beer>('beer');

export const getAPIState = createSelector(
    getFeatureState,
    (state: any) => state
  );


  export const getBeersStats = createSelector(
    getAPIState,
    BeerAdaptor.getSelectors().selectAll
  );

  export const getBeersStatsLoading = createSelector(
    getAPIState,
    (state: BeerState) => state.loading
  );
  
  export const getBeersStatsLoaded = createSelector(
    getAPIState,
    (state: BeerState) => state.loaded
  );