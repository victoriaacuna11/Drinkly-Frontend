import { Component, OnInit } from "@angular/core";
import { DrinkService } from "src/app/services/drink.service";
import { IngredientService } from "src/app/services/ingredient.service";
import { drink } from "./../../../../models/drink";
import { ingredient } from "./../../../../models/ingredient";
import { FormGroup, FormBuilder, Validator, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/storage';


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
  main_image: String;

  sidebar:Boolean;
  

  constructor(
    private ing_service: IngredientService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private drink_service: DrinkService,
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
    console.log('prueba')
    this.getDrink();
  }

  getDrink() {
    
    const id = this.routeSV.snapshot.paramMap.get("id");

    //console.log(id);

    this.drink_service.getDrink(id).subscribe((res: any) => {
      this.drink = { ...res.data };
      console.log(this.drink);
      //GET INGREDIENTS
      this.ing_service.getIngredients().subscribe((res: any) => {
        this.ingredient_arr = [...res.data];
        //this.loading = false;
      });
      //----------------------------
      this.drink_ingredients = this.drink.ingredients;

      console.log(this.drink);
      this.main_image=this.drink.pictures

      this.form = this._builder.group({
        name: [this.drink.name,Validators.required],
        description: [this.drink.description,Validators.required],
        recipe: [this.drink.recipe,Validators.required],
        owner_name: [this.drink.owner.name,Validators.required],
        owner_rol:[this.drink.owner.category,Validators.required],
        //dos cosas que no tocamos
        //ingredients se hace despues
        ingredients: [],
        pictures:"",
      });

      //this.form.controls['owner_rol'].setValue(this.drink.owner.category, {onlySelf: true});

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
    var is_in = false;

    for (let index = 0; index < this.ingredient_arr.length; index++) {
      if (object._id == this.drink.ingredients[index]) {
        is_in = true;
      }
    }

    return is_in;
  }

  editDrink() {
    
    var d: drink = {
      name: this.form.value.name,
      description: this.form.value.description,
        recipe: this.form.value.recipe,
        owner: {
          name: this.form.value.owner_name,
          category: this.form.value.owner_rol,
        },
        ingredients: this.drink_ingredients,
        pictures: this.main_image,
        _id: this.drink._id,
        available: this.drink.available,
        views: 0,
    };
    console.log(d);
    ;

    if (this.main_image != null) {
      if(this.form.invalid){
        const response = alert(
          "Asegurese de rellenar correctamente todos los campos antes de continuar."
        );
      }else if(this.drink_ingredients.length==0){
        const response = alert(
          "Para continuar debe añadir por lo menos un ingrediente a la receta"
        );
      }else{

     
      console.log(d);
      this.drink_service.updateDrink(d).subscribe((res) => {
        this.route.navigate(["admin/drink"]);
      });
    }
    } else {
      const response = alert(
        "No ha subido ninguna imagen. Por favor, suba una."
      );
    }
  }
  
  uploadEnRes(event) {
    this.main_image = event.thumbnail;
  }

  changeImage(url) {
    return this.storage.storage
      .refFromURL(url)
      .delete()
      .then((res) => {
        this.main_image = null;
      });
  }

  mas_de_uno(){
    
    if(this.drink_ingredients.length!=0){
      return false
    }else{
      return true
    }
  }


  //PENDIENTE
  goBack() {
    if(this.main_image==null || this.main_image!=this.drink.pictures){
      const response = alert(
        "Ya borró la imagen. Por favor, tiene que subir una y guardar el cambio."
      );
    } else {
      this.route.navigate(["admin/drink"]);
    }
  }

  getMessage($event){
    this.sidebar = $event;
  }
}
