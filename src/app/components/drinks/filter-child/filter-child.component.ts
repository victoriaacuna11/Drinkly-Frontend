import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-child',
  templateUrl: './filter-child.component.html',
  styleUrls: ['./filter-child.component.scss']
})
export class FilterChildComponent implements OnInit {

/**
 * ingredientes que mostraremos en el componente
 */
@Input() ingredients:[]; 
/**
 * evento que emitimos al componente padre
 */
@Output() add:EventEmitter<any>= new EventEmitter<any>();


  constructor() { }
/**
 * Inicializa el componente
 * 
 */
  ngOnInit() {


    console.log(this.ingredients)
  }

/**
 * envia el ingredietne seleccionado al componente padre
 * @param {any} object inrgediente seleccionado
 */
  select(object:any){

    this.add.emit(object)
    object.style=!object.style;

  }

}
