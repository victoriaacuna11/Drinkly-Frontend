import { Component, OnInit } from '@angular/core';
import { ingredient } from 'src/app/models/ingredient';

@Component({
  selector: 'app-list-ingredient',
  templateUrl: './list-ingredient.component.html',
  styleUrls: ['./list-ingredient.component.scss']
})
export class ListIngredientComponent implements OnInit {

  ingredients : ingredient[];
  constructor() { }

  ngOnInit() {
  }

  getIngredients(){
    
  }


}
