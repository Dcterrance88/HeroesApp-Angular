import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius: 5px;
  }
  `]
})
export class AgregarComponent implements OnInit {

  public publishers = [
    {
      id: 'DcComics',
      desc: 'DC-Comics'
    },
    {
      id: 'MarvelComics',
      desc: 'Marvel-Comics'
    }
  ]

  public heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    if (!this._router.url.includes('editar')) {
      return;
    }
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => this._heroesService.getHeroePorId(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }


  public guardar(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      //actualizar
      this._heroesService.actualizarHeroe(this.heroe)
        .subscribe(heroe => this.mostrarSnackbar('Registro Actualizado'))
    } else {
      //Crear Registro
      this._heroesService.agregarHeroe(this.heroe)
        .subscribe(heroe => {
          this._router.navigate(['/heroes/editar', heroe.id])
          this.mostrarSnackbar('Registro Creado')
        })
    }
  }

  public borrarHeroe(): void {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    // dialog.afterClosed()
    //   .pipe(
    //     switchMap(resp => this._router.navigate(['/heroes/']))
    //   )
    //   .subscribe(
    //     (result) => {
    //       if (result) {
    //         this._heroesService.borrarHeroe(this.heroe.id!)
    //       }
    //     })

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) {
          this._heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this._router.navigate(['/heroes/'])
            });
        }
      })

  }

  public mostrarSnackbar(mensaje: string): void {
    this._snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    });
  }

}
