import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { Beer } from '@app/types/beers';
import { Observable } from 'rxjs';
import { BeerState, loadRequest } from '@app/store/beer-data';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

const NB_BEERS = 25;

@Component({
  selector: 'app-page-select',
  templateUrl: './page-select.component.html',
  styleUrls: ['./page-select.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatInputModule, CommonModule]
})
export class PageSelectComponent {

  private _page = 1;

  beers$: Observable<Beer[]> | null = null

  set page(value: number) {
    this._page = value;
    this.newPage(value)
  }

  get page() { return this._page; }

  constructor(private store: Store<BeerState>) {}

  increment() {
    this.page ++;
  }

  decrement() {
    if (this.page <= 1) return;
    this.page --;
  }

  changePage($event: Event){
    const value = +($event.target as HTMLInputElement).value;
    const newPage = value <= 0 ? 1 : value;
    this.page = newPage;
  }

  newPage(page: number) {
    this.store.dispatch(loadRequest({amount: NB_BEERS, page: page}))
  }

}
