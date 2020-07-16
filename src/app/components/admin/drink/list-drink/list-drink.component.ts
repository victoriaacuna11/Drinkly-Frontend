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
  updating:Boolean=false;

  constructor(private service: DrinkService, private route: Router) {}
/**
 * Inicializa el componente 
 * 
 */
  ngOnInit() {
    this.getDrinks();
  }
/**
 * Trae los drinks de la base de datos 
 * 
 */
  getDrinks() {
    this.service.getDrinks().subscribe((res: any) => {
      this.drinks = [...res.data];
      this.loading = false;
      this.updating=false;
      console.log(this.drinks)
    });
  }
/**
 * @ignore 
 * 
 */
  deleteDrink(id) {
    this.service.deleteDrink(id).subscribe((res) => {
      this.getDrinks();
    });
  }
/**
 * 
 * Inhabilita el drink en la base de datos poniendo la propiedad de available en falso
 * @param {string} id id del trago que se habilita
 */
  inhabilitateDrink(id) {
    this.updating=true;
    this.service.getDrink(id).subscribe((res: any) => {
      this.drinkSelected = { ...res.data };
      this.drinkSelected.available = false;
      this.service.updateDrink(this.drinkSelected).subscribe((res) => {
        this.getDrinks();
      });
    });
  }
/**
 * 
 * Habilita el drink en la base de datos poniendo la propiedad de available en verdadero
 * @param {string} id id del trago que se inhabilita
 */
  habilitateDrink(id) {
    this.updating=true;
    this.service.getDrink(id).subscribe((res: any) => {
      this.drinkSelected = { ...res.data };
      this.drinkSelected.available = true;
      this.service.updateDrink(this.drinkSelected).subscribe((res) => {
        this.getDrinks();
      });
    });
  }
/**
 * Navega a la vista de editar un trago
 * @param {string} id id del trago que se quiere editar
 */
  editDrink(id) {
    
    this.route.navigate(["admin/drink/edit/", id]);
  }
/**
 * Navega a la vista de crear trago
 * 
 */
  create(){
    this.route.navigate(["admin/drink/add"]);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
/**
 * Navega a la de la lista de schemas
 * 
 */
  goBack(){
    this.route.navigate(["admin"]);
  }

}
