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
  /**
   * Loader (indica si la data ya se trajo o no de la DB)
   * @type {Boolean}
   * @default {true}
   */
  loading: Boolean = true;
  /**
   * Lista de ingredientes que están en la DB
   */
  ingredients: ingredient[];
  /**
   * Ingrediente seleccionado.
   */
  ingredientSelected: ingredient;
  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar: Boolean;
  /**
   * Boolean que se encarga de informar si existe información que se está o no enviando a la DB.
   */
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

  /**
   * @ignore
   */
  deleteIngredient(id) {
    this.service.deleteIngredient(id).subscribe((res) => {
      this.getIngredients();
    });
  }

  /**
   * Inhabilita el ingredinte
   * @param {number} id - id del ingrediente que se inhabilita.
   * @returns {void}
   */
  inhabilitateIngredient(id:String):void {
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

  /**
   * Habilita el ingredinte
   * @param {number} id - id del ingrediente que se abilita.
   * @returns {void}
   */
  habilitateIngredient(id:number):void {
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
  /**
   * Navega a la ruta donde se puede editar un ingrediente específico.
   * @param {String} id - id del ingrediente que se editará.
   * @returns {void}
   */
  editIngredient(id:String):void{
    this.route.navigate(["admin/ingredient/edit/", id]);
  }

  /**
   * Navega a la ruta donde se puede crear un ingrediente.
   * @returns {void}
   */
  create():void{
    this.route.navigate(["admin/ingredient/add"]);
  }

  /**
   * Muestra/Oculta el sidebar
   * @param {any} $event - Evento que ocurre al hacer click para mostrar/ocultar el menú
   * @returns {void}
   */
  getMessage($event:any):void{
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  /**
   * Navega al home de admin.
   * @returns {void}
   */
  goBack():void{
    this.route.navigate(["admin"]);
  }
  
}
