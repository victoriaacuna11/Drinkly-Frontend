import { Component, OnInit } from "@angular/core";
import { ingredient } from "src/app/models/ingredient";
import { IngredientService } from "src/app/services/ingredient.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-ingredient",
  templateUrl: "./list-ingredient.component.html",
  styleUrls: ["./list-ingredient.component.scss"],
})
export class ListIngredientComponent implements OnInit {
  loading: Boolean = true;
  ingredients: ingredient[];
  ingredientSelected: ingredient;
  sidebar: Boolean;
  updating:Boolean=false;

  constructor(private service: IngredientService, private route: Router) {}

  ngOnInit() {
    this.getIngredients();
  }

  getIngredients() {
    this.service.getIngredients().subscribe((res: any) => {
      this.ingredients = [...res.data];
      this.loading = false;
      this.updating=false;
    });
    console.log(this.ingredients);
  }

  deleteIngredient(id) {
    this.service.deleteIngredient(id).subscribe((res) => {
      this.getIngredients();
    });
  }

  inhabilitateIngredient(id) {
    this.updating=true;
    this.service.getIngredient(id).subscribe((res: any) => {
      this.ingredientSelected = { ...res.data };
      this.ingredientSelected.available = false;
      this.service
        .updateIngredient(this.ingredientSelected)
        .subscribe((res) => {
          this.getIngredients();
        });
    });
  }

  habilitateIngredient(id) {
    this.updating=true;
    this.service.getIngredient(id).subscribe((res: any) => {
      this.ingredientSelected = { ...res.data };
      this.ingredientSelected.available = true;
      this.service
        .updateIngredient(this.ingredientSelected)
        .subscribe((res) => {
          this.getIngredients();
        });
    });
  }

  editIngredient(id) {
    this.route.navigate(["admin/ingredient/edit/", id]);
  }

  create(){
    this.route.navigate(["admin/ingredient/add"]);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  goBack(){
    this.route.navigate(["admin"]);
  }
  
}
