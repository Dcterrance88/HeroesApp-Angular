import { Heroe } from '../interfaces/heroes.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl : string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  public getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  public getSugerencias(termino: string): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${ termino }&_limit=6`);
  }

  public agregarHeroe( heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

}
