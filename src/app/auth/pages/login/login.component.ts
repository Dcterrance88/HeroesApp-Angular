import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor( private _router: Router) { }

  ngOnInit(): void {
  }

  public login(){
    // Ir al backend
    // tener un usuario
    this._router.navigate(['./heroes']);
  }

}
