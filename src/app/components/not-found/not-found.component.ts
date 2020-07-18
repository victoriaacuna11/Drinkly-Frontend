import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  sidebar: Boolean;

  constructor() { }

  ngOnInit() {
  }

    /**
   * Setea el atributo local que mueve el contenido cuando sale el sidebar
   * @param {any} $event El evento que es pasado cuando el ícono del sidebar es clickeado
   * @returns {void} 
   */
  getMessage($event:any):void{
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

}
