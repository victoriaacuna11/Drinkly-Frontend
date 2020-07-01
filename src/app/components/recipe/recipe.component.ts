import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DrinkService } from 'src/app/services/drink.service';
import { drink } from 'src/app/models/drink';
import { IngredientService } from "src/app/services/ingredient.service";
import { ingredient } from "src/app/models/ingredient";
import { database } from 'firebase';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  
  loading: Boolean = true;
  sidebar: Boolean;
  receta: drink;
  ingredients: ingredient[];
  ingreAux: ingredient;


  constructor(private service: DrinkService, private route: Router, 
    private rout: ActivatedRoute, private service_ing: IngredientService,) { }

  ngOnInit() {
    this.getReceta();
  }

  // getIngredients() {
  //   var i: number;
  //   for(i=0; i<this.receta.ingredients.length; i++){
  //     this.service_ing.getIngredient(this.receta.ingredients[i]).subscribe( (r:any) => {
  //       this.ingreAux = {...r.data};
  //       this.receta.ingredients[i] = this.ingreAux.name;
  //       console.log(this.receta.ingredients[i]);
  //       console.log(this.load)
  //     })
  //   }
  //   console.log(this.load)
  // }

  getIngredientName(id: String){
    let name = '';
    let found = false;
    let i=0;
    while(!found && i<this.ingredients.length){
       if(this.ingredients[i]._id==id){
         found = true;
         name = this.ingredients[i].name.toString();
       }
      i=i+1;
    }
    return name
    
  }

  getIngredients(){
    this.service_ing.getIngredients().subscribe((res:any) => {
      this.ingredients=[...res.data];
      this.loading=false;
    })
  }

  getMessage($event){
    this.sidebar = $event;
  }

  getReceta(){
    const id = this.rout.snapshot.paramMap.get('id');
    this.service.getDrink(id).subscribe( (r:any) => {
      this.receta = {...r.data};
      // this.getIngredients();
      console.log('Drink...');
      console.log(this.receta);
      console.log(this.receta.ingredients.length)
      this.getIngredients();
    })
    
  }

}
