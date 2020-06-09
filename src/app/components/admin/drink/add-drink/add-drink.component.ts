import { Component, OnInit } from "@angular/core";
import { DrinkService } from "src/app/services/drink.service";
import { IngredientService } from "src/app/services/ingredient.service";
import { drink } from "./../../../../models/drink";
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

  form: FormGroup;
  constructor(
    private service: DrinkService,
    private _builder: FormBuilder,
    private route: Router
  ) {
    this.form = this._builder.group({
      name: [""],
      description: [""],
      recipe: [""],
      owner_name: [""],
      owner_rol: [""],
      photo: "",

      //ingredients
    });
  }

  ngOnInit() {}

  onSelectedFile(event) {
    this.selectedFile = event.target.files[0];
  }

  addIngredient() {
    // console.log(this.selectedFile);
    const drink: drink = {
      name: this.form.value.name,
      description: this.form.value.description,
      recipe: this.form.value.recipe,
      owner: {
        name: this.form.value.owner_name,
        category: this.form.value.owner_rol,
      },
      ingredients: [],
      pictures: "",
      _id: "",
      available: true,
      views: 0,
    };

    //let formdata = new FormData();
    //formdata.append("image", this.selectedFile as any);
    //formdata.append("name", ingredient.name as any);
    //formdata.append("category", ingredient.category as any);
    //formdata.append("available", ingredient.available as any);

    console.log(drink);
    //this.service.createDrink(formdata).subscribe((res) => {
    //  this.route.navigate(["admin/drink"]);
    //});
  }

  goBack() {
    this.route.navigate(["admin/drink"]);
  }
}
