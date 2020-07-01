import { Component, OnInit, Input } from '@angular/core';
import { game } from 'src/app/models/game';
import { Ficha } from 'src/app/models/ficha';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.scss']
})
export class JuegosComponent implements OnInit {

  form: FormGroup;
  juegos: game[]; 
  loading: boolean = true;
  sidebar: Boolean;
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
  fichas: Ficha[] = [
    {ficha:'0/0', listo:false},
    {ficha:'0/1', listo:false}, 
    {ficha:'0/2', listo:false}, 
    {ficha:'0/3', listo:false}, 
    {ficha:'0/4', listo:false}, 
    {ficha:'0/5', listo:false}, 
    {ficha:'0/6', listo:false}, 
    {ficha:'1/1', listo:false}, 
    {ficha:'1/2', listo:false}, 
    {ficha:'1/3', listo:false}, 
    {ficha:'1/4', listo:false}, 
    {ficha:'1/5', listo:false}, 
    {ficha:'1/6', listo:false}, 
    {ficha:'2/2', listo:false}, 
    {ficha:'2/3', listo:false}, 
    {ficha:'2/4', listo:false}, 
    {ficha:'2/5', listo:false}, 
    {ficha:'2/6', listo:false}, 
    {ficha:'3/3', listo:false}, 
    {ficha:'3/4', listo:false},
    {ficha:'3/5', listo:false},
    {ficha:'3/6', listo:false},
    {ficha:'4/4', listo:false},
    {ficha:'4/5', listo:false},
    {ficha:'4/6', listo:false},
    {ficha:'5/5', listo:false},
    {ficha:'5/6', listo:false},
    {ficha:'6/6', listo:false},
  ]
  ficha: String;
  jugadores: number;
  trident: number;
  jugadas: number=0;
  jugandoTrident: boolean=false;
  jugando: boolean = false;
  juegoAcabado: boolean=false;

  elegido: string;
  verdad: string;
  reto: string;

  constructor(private service: GameService, private route: Router, private _builder: FormBuilder) { 
    this.form = this._builder.group({
      jug: [""]
    })
  }

  ngOnInit() {
    this.getGames();
  }


    getGames(){
    this.service.getGames().subscribe((g:any) => {
      this.juegos=[...g.data];
      this.loading=false;
    })
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

  guardarJugadores() {
      this.jugadores = this.form.value.jug;
      console.log(this.jugadores);
      this.elegirTrident();
  }

  elegirTrident() {
    this.trident = Math.floor(Math.random() * (this.jugadores))+1;
  }

  sacarFicha() {
    var aux: number;
    aux = Math.floor(Math.random() * this.fichas.length);
    if(this.jugadas<28){
      if(!this.fichas[aux].listo){
        this.ficha = this.fichas[aux].ficha
        this.fichas[aux].listo = true
        this.jugadas = this.jugadas+1;
      }else{
        this.sacarFicha()
      }
    }else{
      this.terminarPartida()
    }
    
  }

  terminarPartida() {
    this.jugandoTrident = false;
      this.trident = 0;
      this.jugadores = 0;
      this.jugando = false;
      this.juegoAcabado = true;
  }

  getMessage($event){
    this.sidebar = $event;
  }

}
