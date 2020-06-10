import { Component, OnInit } from "@angular/core";
import { DrinkService } from "src/app/services/drink.service";
import { IngredientService } from "src/app/services/ingredient.service";
import { drink } from "./../../../../models/drink";
import { ingredient } from "./../../../../models/ingredient";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-drink",
  templateUrl: "./add-drink.component.html",
  styleUrls: ["./add-drink.component.scss"],
})
export class AddDrinkComponent implements OnInit {
  selectedFile: File = null;
  categories: String[] = ["User", "Bartender"];
  ingredient_arr: ingredient[] = [];
  drink_ingredients = [];

  aux_ingred = [
    {
      name: "Ron",
    },
    {
      name: "Fresa",
    },
  ];

  form: FormGroup;
  constructor(
    private service: DrinkService,
    private service_ing: IngredientService,
    private _builder: FormBuilder,
    private route: Router
  ) {
    this.form = this._builder.group({
      name: [""],
      description: [""],
      recipe: [""],
      owner_name: [""],
      owner_rol: [""],
      ingredients: [],
      pictures: "",
    });
  }

  ngOnInit() {
    this.getIngredients();
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
  }

  onSelectedFile(event) {
    this.selectedFile = event.target.files[0];
  }

  getIngredients() {
    this.service_ing.getIngredients().subscribe((res: any) => {
      this.ingredient_arr = [...res.data];
      //this.loading = false;
    });
  }

  addIngredient() {}

  addDrink() {
    // console.log(this.selectedFile);
    const drink: drink = {
      name: this.form.value.name,
      description: this.form.value.description,
      recipe: this.form.value.recipe,
      owner: {
        name: this.form.value.owner_name,
        category: this.form.value.owner_rol,
      },
      ingredients: this.drink_ingredients,
      pictures: "",
      _id: "",
      available: true,
      views: 0,
    };

    console.log(this.selectedFile);

    let formdata = new FormData();
    formdata.append("image", this.selectedFile as any);
    formdata.append("name", drink.name as any);
    formdata.append("description", drink.description as any);
    formdata.append("recipe", drink.recipe as any);
    formdata.append("owner_name", drink.owner.name as any);
    formdata.append("owner_category", drink.owner.category as any);
    formdata.append("ingredients", drink.ingredients as any);
    formdata.append("available", drink.available as any);
    formdata.append("views", drink.views as any);

    console.log(formdata);
    this.service.createDrink(formdata).subscribe((res) => {
      this.route.navigate(["admin/drink"]);
    });
  }

  goBack() {
    this.route.navigate(["admin/drink"]);
  }
}
