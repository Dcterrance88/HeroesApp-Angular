import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  public getHeroes() {
    return this.http.get(' http://localhost:3000/heroes');
  }
}
