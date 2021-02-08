import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap, tap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  public heroe! : Heroe;

  constructor(private activatedRoute : ActivatedRoute,
              private heroesSevice : HeroesService ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesSevice.getHeroe(id)),
      tap(console.log)
    )
    .subscribe(heroe => this.heroe = heroe);
  }

}
