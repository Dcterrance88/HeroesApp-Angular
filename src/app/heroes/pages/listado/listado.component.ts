import { Component, OnInit } from '@angular/core';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

  public heroes : Heroe[] = [];

  constructor( private heroesSevice : HeroesService) { }

  ngOnInit(): void {
    this.heroesSevice.getHeroes()
        .subscribe( heroesResp => this.heroes = heroesResp);
  }

}
