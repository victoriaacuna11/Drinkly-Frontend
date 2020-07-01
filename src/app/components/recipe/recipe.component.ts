import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DrinkService } from 'src/app/services/drink.service';
import { drink } from 'src/app/models/drink';
import { IngredientService } from "src/app/services/ingredient.service";
import { ingredient } from "src/app/models/ingredient";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  load: Boolean = true;
  sidebar: Boolean;
  receta: drink;
  ingredients: String[];
  ingreAux: ingredient;


  constructor(private service: DrinkService, private route: Router, 
    private rout: ActivatedRoute, private service_ing: IngredientService,) { }

  ngOnInit() {
    this.getReceta();
    this.load = false;
  }

  getIngredients() {
    var i: number;
    for(i=0; i<this.receta.ingredients.length; i++){
      this.service_ing.getIngredient(this.receta.ingredients[i]).subscribe( (r:any) => {
        this.ingreAux = {...r.data};
        this.receta.ingredients[i] = this.ingreAux.name;
        console.log(this.receta.ingredients[i]);
        console.log(this.load)
      })
    }
    console.log(this.load)
  }

  getMessage($event){
    this.sidebar = $event;
  }

  getReceta(){
    const id = this.rout.snapshot.paramMap.get('id');
    this.service.getDrink(id).subscribe( (r:any) => {
      this.receta = {...r.data};
      this.getIngredients()
    })
    
  }

}
