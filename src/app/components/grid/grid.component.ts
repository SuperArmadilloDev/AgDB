import { Component, OnInit } from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

import { CustomCardComponent } from '@app-components/custom-card/custom-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { Beer } from '@app/types/beers';
import { CommonModule } from '@angular/common';

import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import { BeerState } from '@app/store/beer-data/reducer';

import { getBeersStats, getBeersStatsLoaded } from '@app-store/beer-data/selector';
import { loadRequest } from '@app/store/beer-data';

const NB_BEERS = 25;

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [ CustomCardComponent, MatGridListModule, CommonModule ],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})

export class GridComponent implements OnInit{

  gridColumns = 3;
  gutterSize="3px";

  beers$: Observable<Beer[]> | null = null

  constructor(breakpointObserver: BreakpointObserver, private store: Store<BeerState>) {

    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe()
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.changeNbCols(query);
          }
        }
      });
  }

  ngOnInit() {
    this.loadBeers()
  }

  changeNbCols(query: string) {
    switch (query) {
      case Breakpoints.XSmall:
        this.gridColumns = 1;
        break;
      case Breakpoints.Small:
        this.gridColumns = 2;
        break;
      case Breakpoints.Medium:
        this.gridColumns = 3;
        break;
      case Breakpoints.Large:
        this.gridColumns = 4;
        break;
      case Breakpoints.XLarge: 
        this.gridColumns = 5;
        break;
    } 
  }

  loadBeers() {
    this.store.select(getBeersStatsLoaded)
    .pipe(
      map((loaded: boolean) => {
        if (!loaded) 
          this.store.dispatch(loadRequest( {amount: NB_BEERS, page: 1}));

      }),
      take(1)
    )
    .subscribe()

    this.beers$ = this.store.select(getBeersStats)
  }
}
