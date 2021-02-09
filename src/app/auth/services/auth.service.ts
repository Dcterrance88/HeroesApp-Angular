import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../pages/interfaces/auth.interface';
import { tap } from 'rxjs/operators';

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

  public login(){
    return this.http.get<Auth>(`${this._baseUrl}/usuarios/1`)
      .pipe(
        tap( auth => this._auth = auth )
      );
  }
}
