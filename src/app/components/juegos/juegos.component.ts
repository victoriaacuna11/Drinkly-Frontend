import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  tridentisOpen: boolean = false;
  chupisisOpen: boolean = false;
  vorisOpen: boolean = false;
  temas: string[]=['Peliculas','Famosos','Series','Animales','Marcas de Carro','Equipos de Futbol','Capitales','Marcas de Zapato'];
  retos: string[]=['Besa a alguien del grupo', 
                  'Escribele a tu ex y dile que lo extrañas', 
                  'Llama a tu crush',
                  'Monta una foto fea en tus stories'];
  verdades: string[]=['Has cometido un delito?', 
                    'Te gusta alguien en esta mesa?', 
                    'Que es lo mas cochino que has hecho en tu vida?',
                    'A quien matarias de tus exes?'];
  elegido: string;
  verdad: string;
  reto: string;

  constructor() { }

  ngOnInit() {
  }

  elegirTema() {
    this.elegido = this.temas[Math.floor(Math.random() * this.temas.length)]
  }

  elegirVerdad() {
    this.verdad = this.verdades[Math.floor(Math.random() * this.verdades.length)]
  }

  elegirReto() {
    this.reto = this.retos[Math.floor(Math.random() * this.retos.length)]
  }

}
