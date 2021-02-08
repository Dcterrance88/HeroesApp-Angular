import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';
import { HeroesService } from '../services/heroes.service';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  public heroes : Heroe[] = [];

  constructor( private heroesSevice : HeroesService) { }

  transform( heroe : Heroe ): string {
    return `assets/heroes/${heroe.id}.jpg`;
  }

}
