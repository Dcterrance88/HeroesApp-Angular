import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap, tap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img{
      width: 80%;
      border-radius: 6px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  public heroe! : Heroe;

  constructor(private activatedRoute : ActivatedRoute,
              private heroesSevice : HeroesService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesSevice.getHeroePorId(id)),
      tap(console.log)
    )
    .subscribe(heroe => this.heroe = heroe);
  }

  public regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
