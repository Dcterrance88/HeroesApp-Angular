import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {//1
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule)
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path:'**',
    redirectTo: '404'
    // component: ErrorPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

/*
Cuando alguien entre al path auth carga sus hijos y dichos
va a venir del producto del auth.module, cuando se carge en 
memoria, entonces el modulo que va a regresar es el AuthModule.
*/
