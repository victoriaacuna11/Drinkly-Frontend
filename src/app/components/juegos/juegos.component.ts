import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  tridentisOpen: boolean = false;
  chupisisOpen: boolean = false;
  temas: string[]=['Peliculas','Famosos','Series','Animales','Marcas de Carro','Equipos de Futbol','Capitales','Marcas de Zapato'];
  elegido: string;

  constructor() { }

  ngOnInit() {
  }

  elegirTema() {
    this.elegido = this.temas[Math.floor(Math.random() * this.temas.length)]
  }

}
