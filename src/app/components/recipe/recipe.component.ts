import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  // CAMBIAR A TRUE
  loading: Boolean=false;
  sidebar: Boolean;
  constructor() { }

  ngOnInit() {
  }
  
  getMessage($event){
    this.sidebar = $event;
  }

}
