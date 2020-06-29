import { Component, OnInit } from "@angular/core";
import { DrinkService } from "src/app/services/drink.service";
import { IngredientService } from "src/app/services/ingredient.service";
import { drink } from "./../../../../models/drink";
import { ingredient } from "./../../../../models/ingredient";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  sidebar: Boolean;


  form: FormGroup;
  constructor(
    private service: DrinkService,
    private service_ing: IngredientService,
    private _builder: FormBuilder,
    private route: Router,
    private storage: AngularFireStorage
  ) {
    this.form = this._builder.group({
      name: ["",Validators.required],
      description: ["",Validators.required],
      recipe: ["",Validators.required],
      owner_name: ["",Validators.required],
      owner_rol: ["",Validators.required],
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

          if(this.form.invalid){
            const response = alert(
              "Asegurese de rellenar correctamente todos los campos antes de continuar."
            );
          }else if(this.drink_ingredients.length==0){
            const response = alert(
              "Para continuar debe añadir por lo menos un ingrediente a la receta"
            );
          }else{

          

          
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

            console.log(this.drink_created);
            this.service.createDrink(this.drink_created).subscribe((res) => {
              this.route.navigate(["admin/drink"]);
            });

        
          }
      
    } else {
      const response = alert(
        "Debe introducir una imagen como ícono."
      );
    }
    

    // hay que crear el puto bar

    
  }

  mas_de_uno(){
    
    if(this.drink_ingredients.length!=0){
      return false
    }else{
      return true
    }
  }

  goBack() {
    this.route.navigate(["admin/drink"]);
  }

  getMessage($event){
    this.sidebar = $event;
  }
}
