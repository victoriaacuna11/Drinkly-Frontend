import { Component, OnInit } from "@angular/core";
import { DrinkService } from "src/app/services/drink.service";
import { IngredientService } from "src/app/services/ingredient.service";
import { drink } from "./../../../../models/drink";
import { ingredient } from "./../../../../models/ingredient";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: "app-add-drink",
  templateUrl: "./add-drink.component.html",
  styleUrls: ["./add-drink.component.scss"],
})
export class AddDrinkComponent implements OnInit {
  selectedFile: File = null;
  categories: String[] = ["User", "Bartender"];
  ingredient_arr: ingredient[] = [];
  ingredient_arr_aux: ingredient[] = [];
  drink_ingredients = [];
  main_image: String = null;
  main_image_ing: String = null;
  categories_ing:String[]=[]
  drink_created:drink;
  sidebar: Boolean;
  show_ing:boolean;
  autocomplete:String[]=[];
  autocompleteaux:Observable<String[]>;
  control:FormControl=new FormControl;


  form: FormGroup;
  form_ing:FormGroup;
  constructor(
    private service: DrinkService,
    private service_ing: IngredientService,
    private _builder: FormBuilder,
    private route: Router,
    private storage: AngularFireStorage,
    private categoryService: CategoriesService,
  ) {
    this.form = this._builder.group({
      name: ["",Validators.required],
      description: ["",Validators.required],
      recipe: ["",Validators.required],
      owner_name: ["",Validators.required],
      owner_rol: ["",Validators.required],
      ingredients: this._builder.array([
        this.addIngGroup()
      ]),
      pictures: "",
    });

    this.form_ing= this._builder.group({
      name_ing: ["", Validators.required],
      category_ing: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.getIngredients();
    this.categories_ing=this.categoryService.getCategories();
  }

  addIngGroup() {
    return this._builder.group({
      ingredients: ["", Validators.required],
    });
  }
  addIng() {
    this.IngArray.push(this.addIngGroup());
  }
  deleteIng(index) {
    this.IngArray.removeAt(index);
  }
  get IngArray() {
    return <FormArray>this.form.get("ingredients");
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
      this.ingredient_arr_aux = [...res.data];
      this.ingredient_arr_aux.forEach(i =>{
        if(i.available){
          this.ingredient_arr.push(i);
        }
      })
      this.autocomplete=[]
      for (let index = 0; index < this.ingredient_arr.length; index++) {
        this.autocomplete.push(this.ingredient_arr[index].name)
      }
      console.log(this.autocomplete)

      this.autocompleteaux = this.control.valueChanges
        .pipe(
          startWith(''),
          map(val=> this.filter(val))
        )
      
      //this.loading = false;
    });
  }



  filter(val:string): String[] {
    
    return this.autocomplete.filter(option =>
      option.toLocaleLowerCase().indexOf(val.toLowerCase())===0
      )
  }

  is_valid(){
    let valid=true
    let aux_name=[]
    for (let index = 0; index < this.ingredient_arr.length; index++) {
      aux_name.push(this.ingredient_arr[index].name)
    }
    console.log(aux_name)
      for (let r = 0; r < this.form.value.ingredients.length; r++) {    
        if(!aux_name.includes(this.form.value.ingredients[r].ingredients)){
          valid=false
        }
      }
      return valid
  }

  

  addDrink() {
    // console.log(this.selectedFile);
    if(this.main_image!=null){

          if(this.form.invalid){
            const response = alert(
              "Asegurese de rellenar correctamente todos los campos antes de continuar."
            );
          }else if(!this.is_valid()){
            const response = alert(
              "Por favor seleccione ingredientes existentes usando el autocompletado"
            );

          }else{ 
            let ing:String[]=[];
            this.form.value.ingredients.forEach((item) => {
              console.log(item.ingredients)
              for (let index = 0; index < this.ingredient_arr.length; index++) {
                if(item.ingredients==this.ingredient_arr[index].name){
                  ing.push(this.ingredient_arr[index]._id)
                  console.log(ing)
                }
                
              }

            });
            this.drink_created = {
              name: this.form.value.name,
              description: this.form.value.description,
              recipe: this.form.value.recipe,
              owner: {
                name: this.form.value.owner_name,
                category: this.form.value.owner_rol,
              },
              ingredients: ing,
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

  
  change(i){

    this.autocomplete=[]
      for (let index = 0; index < this.ingredient_arr.length; index++) {
        this.autocomplete.push(this.ingredient_arr[index].name)
        
      }
    

    let nuevo =[];


    for (let index = 0; index < this.autocomplete.length; index++) {
      let auto=this.autocomplete[index].toLowerCase()
      
      if(auto.includes(this.form.value.ingredients[i].ingredients.toLowerCase())){
        nuevo.push(this.autocomplete[index])
      }
      
    }

    

    this.autocomplete=nuevo
    if(this.form.value.ingredients[i].ingredients.length==0){
      this.autocomplete=[]
      for (let index = 0; index < this.ingredient_arr.length; index++) {
        this.autocomplete.push(this.ingredient_arr[index].name)
        
      }
    }

  }

  clicked(i){

    this.autocomplete=[]
      for (let index = 0; index < this.ingredient_arr.length; index++) {
        this.autocomplete.push(this.ingredient_arr[index].name)
        
      }

    if(this.form.value.ingredients[i].ingredients===""){
      this.autocomplete=[]
      for (let index = 0; index < this.ingredient_arr.length; index++) {
        this.autocomplete.push(this.ingredient_arr[index].name)
      }
    }else{

      let nuevo =[];
    for (let index = 0; index < this.autocomplete.length; index++) {
      let auto=this.autocomplete[index].toLowerCase()
      
      if(auto.includes(this.form.value.ingredients[i].ingredients.toLowerCase())){
        nuevo.push(this.autocomplete[index])
      }
    }
    this.autocomplete=nuevo
    }
  }

  uploadEnRes_ing(event) {
    this.main_image_ing = event.thumbnail;
  }

  changeImage_ing(url) {
    return this.storage.storage
      .refFromURL(url)
      .delete()
      .then((res) => {
        this.main_image_ing = null;
      });
  }

  addIngredient(){
    
    if(this.main_image_ing!=null){
      let ing: ingredient = {
        name: this.form_ing.value.name_ing,
        category: this.form_ing.value.category_ing,
        photo: this.main_image_ing,
        _id: "",
        available: true,
      };
      console.log(ing)
      this.service_ing.createIngredient(ing).subscribe((res) => {
        this.getIngredients()
        this.form_ing.value.name_ing=""
        this.form_ing.value.category_ing=""
        this.main_image_ing=null 
      });
    } else {
      const response = alert(
        "No ha subido ninguna imagen. Por favor, suba una."
      );
    }
    
  }

  }
 

