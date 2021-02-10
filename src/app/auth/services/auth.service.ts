import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Auth } from '../pages/interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  public get auth() : Auth{
    return { ...this._auth!};
  }

  constructor(private http: HttpClient) { }

  public verificaAutenticacion(): Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false);
    }
    return this.http.get<Auth>(`${this._baseUrl}/usuarios/1`)
      .pipe(
        map(
          auth => {
            this._auth = auth;
            return true;
          })
      )
  }

  public login(){
    return this.http.get<Auth>(`${this._baseUrl}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth ),
        tap( auth => localStorage.setItem('token', auth.id))
      );
  }
}

//of sirve para crear observables en base al argumento que se pone
