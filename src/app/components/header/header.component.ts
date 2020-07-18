import { SharedService } from './../../services/shared.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() hasSearchBar : Boolean;
  @Input() hasFilter: Boolean;
  @Input() searchBarContent : String;
  @Output() filt = new EventEmitter<string>();
  @Input() arr: any[];
  @Input() filterOp: any[];
  // @Input() isDefault: Boolean;
  isDefault= false;
  touched = false;
  filteringOptions = false;
  filterPost= '';
  

  constructor(private data: SharedService) { }

  /**
   * Inicializa al componente, suscribiendolo al servicio del filtro, en el cual los componentes de las listas también están suscritos
   */
  ngOnInit() {
    this.data.currentMsg.subscribe(m => this.filterPost=m)
  }

  /**
   * Cada vez que se escribe una letra en el input buscador, envía la palabra que está en ese input al servicio del filtro
   */
  makeChange(){
    if(this.filteringOptions){
      this.filteringOptions=false;
    }
    this.touched=true;
    this.data.changeMsg((<HTMLInputElement>document.getElementById("search")).value) 
   }

   /**
    * Oculta o muestra la lista de filtros
    */
   showDrop(){
     if(this.filteringOptions){
       this.filteringOptions=false;
     }
     this.touched = !this.touched;
   }

   /**
    * Oculta o muestra la lista de opciones que se tienen para filtrar
    */
   showDropForFilteringOp(){
     if(this.touched){
       this.touched=false;
     }
     this.filteringOptions = !this.filteringOptions;
   }

  //  getSearchValue(){
  //    return (<HTMLInputElement>document.getElementById("search")).value;
  //  }

  /**
   * Envía la palabra completa sobre la cual hace click en la lista de filtros al servicio de filtros
   * @param {string} i la palabra que clickeó
   * @returns {void}
   */
   newMessage(i:string):void{
     console.log(i)
     this.data.changeMsg(i)
     this.touched=false;
   }

  /**
   * Envía al servicio del filtro la palabra que está en el input cuando hace click en la tecla Enter
   */
   pressEnter(){
    this.touched=false;
    (<HTMLInputElement>document.getElementById("search")).blur();
    
   }

   /**
    * Envía el nuevo parámetro por el cual se filtrará a las listas que tienen varias opciones de filtrado
    * @param {string} i la opción de filtrado
    */
   sendChangedFilter(i: string){
    this.filteringOptions = !this.filteringOptions;
    console.log(i);
     this.filt.emit(i);
   }

  //  search(i){
  //    this.filt.emit(i)
  //  }

}
