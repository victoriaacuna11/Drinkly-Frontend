import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-child',
  templateUrl: './filter-child.component.html',
  styleUrls: ['./filter-child.component.scss']
})
export class FilterChildComponent implements OnInit {


@Input() ingredients:[]; 
@Output() add:EventEmitter<any>= new EventEmitter<any>();


  constructor() { }

  ngOnInit() {


    console.log(this.ingredients)
  }

  select(object:any){

    this.add.emit(object)
    object.style=!object.style;

  }

}
