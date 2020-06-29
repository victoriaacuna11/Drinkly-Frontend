import { Component, OnInit } from "@angular/core";
import { drink } from "src/app/models/drink";
import { DrinkService } from "src/app/services/drink.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-drink",
  templateUrl: "./list-drink.component.html",
  styleUrls: ["./list-drink.component.scss"],
})
export class ListDrinkComponent implements OnInit {
  loading: Boolean = true;
  drinks: drink[];
  drinkSelected: drink;
  sidebar: Boolean;

  constructor(private service: DrinkService, private route: Router) {}

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.service.getDrinks().subscribe((res: any) => {
      this.drinks = [...res.data];
      this.loading = false;
      console.log(this.drinks)
    });
  }

  deleteDrink(id) {
    this.service.deleteDrink(id).subscribe((res) => {
      this.getDrinks();
    });
  }

  inhabilitateDrink(id) {
    this.service.getDrink(id).subscribe((res: any) => {
      this.drinkSelected = { ...res.data };
      this.drinkSelected.available = false;
      this.service.updateDrink(this.drinkSelected).subscribe((res) => {
        this.getDrinks();
      });
    });
  }

  habilitateDrink(id) {
    this.service.getDrink(id).subscribe((res: any) => {
      this.drinkSelected = { ...res.data };
      this.drinkSelected.available = true;
      this.service.updateDrink(this.drinkSelected).subscribe((res) => {
        this.getDrinks();
      });
    });
  }

  editDrink(id) {
    
    this.route.navigate(["admin/drink/edit/", id]);
  }

  create(){
    this.route.navigate(["admin/drink/add"]);
  }

  getMessage($event){
    this.sidebar = $event;
  }
}
