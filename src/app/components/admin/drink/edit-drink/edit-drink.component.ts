import { Component, OnInit } from "@angular/core";
import { DrinkService } from "src/app/services/drink.service";
import { IngredientService } from "src/app/services/ingredient.service";
import { drink } from "./../../../../models/drink";
import { ingredient } from "./../../../../models/ingredient";
import { FormGroup, FormBuilder, Validator } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-drink",
  templateUrl: "./edit-drink.component.html",
  styleUrls: ["./edit-drink.component.scss"],
})
export class EditDrinkComponent implements OnInit {
  selectedFile: File = null;
  categories: String[] = ["User", "Bartender"];
  ingredient_arr: ingredient[] = [];
  drink_ingredients = [];
  form: FormGroup;
  drink: drink;
  drink2: drink;
  loading: boolean = true;
  

  constructor(
    private ing_service: IngredientService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private drink_service: DrinkService
  ) {
    this.form = this._builder.group({
      name: "",
      description: "",
      recipe: "",
      owner_name: "",
      owner_rol: [""],
      ingredients: [],
      pictures: "",
    });
  }

  ngOnInit() {
    console.log('prueba')
    this.getDrink();
  }

  getDrink() {
    
    const id = this.routeSV.snapshot.paramMap.get("id");

    console.log(id);

    this.drink_service.getDrink(id).subscribe((res: any) => {
      this.drink = { ...res.data };

      //GET INGREDIENTS
      this.ing_service.getIngredients().subscribe((res: any) => {
        this.ingredient_arr = [...res.data];

        //this.loading = false;
      });
      //----------------------------

      this.drink_ingredients = this.drink.ingredients;

      console.log(this.drink);
      console.log(this.ingredient_arr)

      this.form = this._builder.group({
        name: this.drink.name,
        description: this.drink.description,
        recipe: this.drink.recipe,
        owner_name: this.drink.owner.name,
        owner_rol: this.drink.owner.category,

        //dos cosas que no tocamos
        //ingredients se hace despues
        ingredients: [],
        pictures: this.drink.pictures,
      });

      console.log(this.drink);
      //Mierda de los checkbox
      this.loading = false;
    });
  }

  getIngredients() {
    this.ing_service.getIngredients().subscribe((res: any) => {
      this.ingredient_arr = [...res.data];

      //this.loading = false;
    });
  }

  getSelect(object: any) {
    var is_in = false;

    for (let index = 0; index < this.drink_ingredients.length; index++) {
      if (object._id == this.drink_ingredients[index]) {
        is_in = true;
        index = this.drink_ingredients.length;
      }
    }

    if (!is_in) {
      this.drink_ingredients.push(object._id);
    } else {
      for (let index = 0; index < this.drink_ingredients.length; index++) {
        if (object._id == this.drink_ingredients[index]) {
          this.drink_ingredients.splice(index, 1);
        }
      }
    }

    console.log(this.drink_ingredients);
  }

  ingSelector(object: any) {
    var is_in = true;

    for (let index = 0; index < this.ingredient_arr.length; index++) {
      if (object._id == this.ingredient_arr[index]) {
        is_in = true;
      }
    }

    return is_in;
  }

  editIngredient() {}

  goBack() {
    this.route.navigate(["admin/drink"]);
  }
}
