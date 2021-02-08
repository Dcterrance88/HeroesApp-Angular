import { Heroe } from '../interfaces/heroes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  public getHeroes() : Observable<Heroe[]> {
    return this.http.get<Heroe[]>(' http://localhost:3000/heroes');
  }

  public getHeroe(id: string) : Observable<Heroe> {
    return this.http.get<Heroe>(`http://localhost:3000/heroes/${id}`);
  }
}
