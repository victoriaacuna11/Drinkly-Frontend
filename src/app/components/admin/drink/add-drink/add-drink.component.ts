import { Component, OnInit } from "@angular/core";
import { DrinkService } from "src/app/services/drink.service";
import { IngredientService } from "src/app/services/ingredient.service";
import { drink } from "./../../../../models/drink";
import { ingredient } from "./../../../../models/ingredient";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";

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
  main_image: String = null;
  drink_created:drink;

  form: FormGroup;
  constructor(
    private service: DrinkService,
    private service_ing: IngredientService,
    private _builder: FormBuilder,
    private route: Router,
    private storage: AngularFireStorage
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

  changeImage(url) {
    return this.storage.storage
      .refFromURL(url)
      .delete()
      .then((res) => {
        this.main_image = null;
      });
  }
  uploadEnRes(event) {
    this.main_image = event.thumbnail;
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
    if(this.main_image!=null){
      this.drink_created = {
        name: this.form.value.name,
        description: this.form.value.description,
        recipe: this.form.value.recipe,
        owner: {
          name: this.form.value.owner_name,
          category: this.form.value.owner_rol,
        },
        ingredients: this.drink_ingredients,
        pictures: this.main_image,
        _id: "",
        available: true,
        views: 0,
      };
    } else {
      const response = alert(
        "Debe introducir una imagen como ícono."
      );
    }
    

    // hay que crear el puto bar

    console.log(this.drink_created);
    this.service.createDrink(this.drink_created).subscribe((res) => {
      this.route.navigate(["admin/drink"]);
    });
  }

  goBack() {
    this.route.navigate(["admin/drink"]);
  }
}
