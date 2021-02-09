import { CdkObserveContent } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`
  #example-card {
    max-width: 400px;    
  }
  #example-card img{
    width: 200px;
  }
  `]
})
export class BuscarComponent implements OnInit {

  public termino : string = '';
  public heroes: Heroe[] = [];
  public heroeSeleccionado! : Heroe | undefined;

  constructor( private heroesService : HeroesService) { }

  ngOnInit(): void {
  }

  public buscando() {
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe( heroes => this.heroes = heroes)
    
  }

  public opcionSeleccionada(event: MatAutocompleteSelectedEvent ){
    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      return;
    }
    console.log(event.option.value);
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroePorId(heroe.id!)
    .subscribe( heroe => this.heroeSeleccionado = heroe);
  }

}
