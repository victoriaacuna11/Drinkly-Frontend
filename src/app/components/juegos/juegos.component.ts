import { Component, OnInit, Input } from '@angular/core';
import { game } from 'src/app/models/game';
import { Ficha } from 'src/app/models/ficha';
import { GameService } from 'src/app/services/game.service';
import { Router, Event } from '@angular/router';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  retos: string[]=['Escribele a tu ex y dile que lo extrañas', 
                  'Llama a tu crush',
                  'Monta una foto fea en tus stories'];
  verdades: string[]=['Has cometido un delito?', 
                    'Te gusta alguien en esta mesa?', 
                    'Que es lo mas cochino que has hecho en tu vida?',
                    'A quien matarias de tus exes?'];
  fichas: Ficha[] = [
    {ficha:'0_0', listo:false},
    {ficha:'0_1', listo:false}, 
    {ficha:'0_2', listo:false}, 
    {ficha:'0_3', listo:false}, 
    {ficha:'0_4', listo:false}, 
    {ficha:'0_5', listo:false}, 
    {ficha:'0_6', listo:false}, 
    {ficha:'1_1', listo:false}, 
    {ficha:'1_2', listo:false}, 
    {ficha:'1_3', listo:false}, 
    {ficha:'1_4', listo:false}, 
    {ficha:'1_5', listo:false}, 
    {ficha:'1_6', listo:false}, 
    {ficha:'2_2', listo:false}, 
    {ficha:'2_3', listo:false}, 
    {ficha:'2_4', listo:false}, 
    {ficha:'2_5', listo:false}, 
    {ficha:'2_6', listo:false}, 
    {ficha:'3_3', listo:false}, 
    {ficha:'3_4', listo:false},
    {ficha:'3_5', listo:false},
    {ficha:'3_6', listo:false},
    {ficha:'4_4', listo:false},
    {ficha:'4_5', listo:false},
    {ficha:'4_6', listo:false},
    {ficha:'5_5', listo:false},
    {ficha:'5_6', listo:false},
    {ficha:'6_6', listo:false},
  ]
  ficha: String;
  jugadores: number;
  trident: number;
  jugadas: number=0;
  jugandoTrident: boolean=false;
  jugando: boolean = false;
  juegoAcabado: boolean=false;
  hayJugadores: boolean = true;

  elegido: string;
  verdad: string;
  reto: string;

  constructor(private service: GameService, private route: Router, private _builder: FormBuilder, ) { 
    this.form = this._builder.group({
      jug: [""]
    })
  }

  /**
   * Inicializa el componente
   */
  ngOnInit() {
    this.getGames();
  }

  
    /**
     * Trae los juegos de la base de datos para mostrar las instrucciones y la descripcion
     * @returns {void}
     */
    getGames(){
    this.service.getGames().subscribe((g:any) => {
      this.juegos=[...g.data];
      this.loading=false;
    })
    }

  /**
   * 
   * @param {any} $event El evento que es pasado cuando el botón de "filtrar por" es clickeado
   * @returns {void}   
   */

    /**
   * Elige el tema entre el array de temas para cultura chupistica
   * @returns {void}   
   */
  elegirTema() {
    this.elegido = this.temas[Math.floor(Math.random() * this.temas.length)]
  }

    /**
   * Elige una verdad entre el array de verdades para verdad o reto
   * @returns {void}   
   */
  elegirVerdad() {
    this.verdad = this.verdades[Math.floor(Math.random() * this.verdades.length)]
  }

    /**
   * Elige el reto entre el array de retos para verdad o reto
   * @returns {void}   
   */
  elegirReto() {
    this.reto = this.retos[Math.floor(Math.random() * this.retos.length)]
  }

    /**
   * Obtiene el numero de jugadores que introdujo el usuario y lo guarda
   * @returns {void}   
   */
  guardarJugadores() {
      this.jugadores = this.form.value.jug;
      console.log(this.jugadores);
      if(this.jugadores){
        this.hayJugadores = true;
        this.elegirTrident();  
        this.jugandoTrident = true;
        this.juegoAcabado = false;
        this.jugando = true;
      }else{
        this.hayJugadores = false;
      }
      
  }

    /**
   * Elige el numero del jugador que sera el trident a partir del numero de jugadores que introdujo el usuario para Trident
   * @returns {void}   
   */
  elegirTrident() {
    this.trident = Math.floor(Math.random() * (this.jugadores))+1;
  }

    /**
   * Elige una ficha entre el array de fichas y cambia su variable listo a verdadero para no tomarlo en cuenta 
   * al sacar otra ficha en la misma partida
   * @returns {void}   
   */
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

    /**
   * Desactiva todos los botones que se utilizan durante el juego, activa el boton para introducir jugarores, 
   * cambia la variable listo de todas las fichas a false y define la cantidad de jugadores y numero de trident a 0
   * @returns {void}   
   */
  terminarPartida() {
    this.jugandoTrident = false;
    this.trident = 0;
    this.jugadores = 0;
    this.jugando = false;
    this.juegoAcabado = true;
    var i = 0;
    for(i = 0; i<this.fichas.length ; i++){
      this.fichas[i].listo = false
    }
    this.jugadas = 0;

  }

  /**
   * Setea el atributo local que mueve el contenido cuando sale el sidebar
   * @param {any} $event El evento que es pasado cuando el ícono del sidebar es clickeado
   * @returns {void} 
   */
  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

}
