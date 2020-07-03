import { Component, OnInit } from "@angular/core";
import { DrinkService } from "src/app/services/drink.service";
import { IngredientService } from "src/app/services/ingredient.service";
import { drink } from "./../../../../models/drink";
import { ingredient } from "./../../../../models/ingredient";
import { FormGroup, FormBuilder, Validator, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/storage';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: "app-edit-drink",
  templateUrl: "./edit-drink.component.html",
  styleUrls: ["./edit-drink.component.scss"],
})
export class EditDrinkComponent implements OnInit {
  selectedFile: File = null;
  categories: String[] = ["User", "Bartender"];
  categories_ing: String[] = [];
  ingredient_arr: ingredient[] = [];
  ingredient_arr_aux: ingredient[] = [];
  drink_ingredients = [];
  form: FormGroup;
  form_ing:FormGroup;
  drink: drink;
  drink2: drink;
  loading: boolean = true;
  main_image: String;
  main_image_ing: String;
  autocomplete:String[]=[];

  createIngredient:Boolean=false;


  sidebar:Boolean;
  

  constructor(
    private ing_service: IngredientService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private drink_service: DrinkService,
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
    console.log('prueba')
    this.getDrink();
    this.categories_ing=this.categoryService.getCategories();

  }

  getDrink() {
    
    const id = this.routeSV.snapshot.paramMap.get("id");

    //console.log(id);

    this.drink_service.getDrink(id).subscribe((res: any) => {
      this.drink = { ...res.data };
      console.log(this.drink);
      //GET INGREDIENTS
      this.ing_service.getIngredients().subscribe((res: any) => {
        this.ingredient_arr_aux = [...res.data];
        this.ingredient_arr_aux.forEach(i =>{
          if(i.available){
            this.ingredient_arr.push(i);
          }
        })
        
        //this.loading = false;
        this.autocomplete=[]

        for (let index = 0; index < this.ingredient_arr.length; index++) {
          this.autocomplete.push(this.ingredient_arr[index].name)
        }
        console.log(this.autocomplete)

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
        ingredients: this._builder.array([
        
        ]),
        pictures:"",
      });


      this.drink.ingredients.forEach(item => {

        console.log(item)
        let ingr:String="";
        console.log(this.ingredient_arr)
        for (let x = 0; x < this.ingredient_arr.length; x++) {
          console.log(item===this.ingredient_arr[x]._id)
          if(item===this.ingredient_arr[x]._id){
            ingr=this.ingredient_arr[x].name
          }
        }
        console.log(ingr)
        this.IngArray.push(this.addIngGroupWithValue(ingr));

      });

      //console.log(this.drink.ingredients)

      //this.form.controls['owner_rol'].setValue(this.drink.owner.category, {onlySelf: true});

      console.log(this.drink);
      //Mierda de los checkbox
      this.loading = false;
      });
      //----------------------------
      
    });
  }

  addIngGroupWithValue(ing) {
    return this._builder.group({
      ingredients: [ing, Validators.required]
    })
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

  editDrink() {

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
    
    var d: drink = {
      name: this.form.value.name,
      description: this.form.value.description,
        recipe: this.form.value.recipe,
        owner: {
          name: this.form.value.owner_name,
          category: this.form.value.owner_rol,
        },
        ingredients: ing,
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
      }else if(!this.is_valid()){
        const response = alert(
          "Por favor seleccione ingredientes existentes usando el autocompletado"
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
    if(screen.width>640){
      this.sidebar = $event;
    }
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
      this.ing_service.createIngredient(ing).subscribe((res) => {
        this.getIngredients2()
        this.form_ing.value.name_ing=""
        this.form_ing.value.category_ing=""
        this.main_image_ing=null 
        this.createIngredient=false;
      });
    } else {
      const response = alert(
        "No ha subido ninguna imagen. Por favor, suba una."
      );
    }
    
  }
  
  getIngredients2() {
    this.ing_service.getIngredients().subscribe((res: any) => {
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
      //this.loading = false;
    });
  }

  addNewIng(){
    this.createIngredient=true;
    console.log(this.createIngredient);
    console.log(this.loading);
  }

  notAddIng(){
    this.createIngredient=false;
  }



}
