import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beer } from '@app/types/beers';

@Injectable({
  providedIn: 'root'
})
export class PunkApiService {

  baseUrl = "https://api.punkapi.com/v2/beers"

  constructor (private http: HttpClient) {}

  getBeers(page:number, amount: number) {return this.http.get<Beer[]>(this.baseUrl, {params: {
    page: page,
    per_page: amount
  }}) }
}
