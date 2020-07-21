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
  /**
   * file para usar el servicio de firestorage
   */
  selectedFile: File = null;
  /**
   * lista de las categorias para un usuario
   */
  categories: String[] = ["User", "Bartender"];
  /**
   * lista de las categorias de los ingredientes
   */
  categories_ing: String[] = [];
  /**
   * lista de los ingredientes disponibles traidos de la base de datos
   */
  ingredient_arr: ingredient[] = [];
  /**
   * lista de los ingredientes traidos de la base de datos
   */
  ingredient_arr_aux: ingredient[] = [];
  /**
   * ingredientes del trago que se editara
   */
  drink_ingredients = [];
  /**
   * form que su usara para editar un trago
   */
  form: FormGroup;
  /**
   * form que se utilizara para crear un ingrediente
   */
  form_ing:FormGroup;
  /**
   * drink a ser editado
   */
  drink: drink;
  /**
   * @ignore
   */
  drink2: drink;
  /**
   * atributo que indica si se han cargado los datos traidos de la base de datos
   */
  loading: boolean = true;
  /**
   * imagen del trago a editar
   */
  main_image: String;
  /**
   * imagen del ingrediente a crear
   */
  main_image_ing: String;
  /**
   *  lista de ingredientes que cumplen con lo que se escribe en el input de seleccionar ingrediente
   */
  autocomplete:String[]=[];
/**
   * atributo que esconde y muestra la vista de crear un ingrediente
   */
  createIngredient:Boolean=false;
  /**
   * atributo que nos indica si un drink se esta updating
   */
  updating:Boolean=false;
  /**
   * atributo que nos indica si un drink se esta creando
   */
  updatingIng:Boolean=false;

/**
   *  atributo que muestra y esconde la navbar
   */
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
/**
 * Inicializa el componente 
 * 
 */
  ngOnInit() {
    this.getDrink();
    this.categories_ing=this.categoryService.getCategories();

  }
/**
 * Trae el drink de la base de datos 
 * 
 */
  getDrink() {
    
    const id = this.routeSV.snapshot.paramMap.get("id");


    this.drink_service.getDrink(id).subscribe((res: any) => {
      this.drink = { ...res.data };
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

        this.drink_ingredients = this.drink.ingredients;

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

        let ingr:String="";
        for (let x = 0; x < this.ingredient_arr.length; x++) {
          if(item===this.ingredient_arr[x]._id){
            ingr=this.ingredient_arr[x].name
          }
        }
        this.IngArray.push(this.addIngGroupWithValue(ingr));

      });


      //this.form.controls['owner_rol'].setValue(this.drink.owner.category, {onlySelf: true});

      //Mierda de los checkbox
      this.loading = false;
      });
    });
  }
/**
 * Añade un campo al form de ingredientes
 * @param {string} ing ingrediente ligado al campo  
 * 
 */
  addIngGroupWithValue(ing) {
    return this._builder.group({
      ingredients: [ing, Validators.required]
    })
  }

/**
 * Trae los ingredientes de la base de datos
 * 
 */
  getIngredients() {
    this.ing_service.getIngredients().subscribe((res: any) => {
      this.ingredient_arr = [...res.data];
      //this.loading = false;
      
    });
  }
/**
 * @ignore
 * 
 */
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
/**
 * @ignore
 * 
 */
  ingSelector(object: any) {
    var is_in = false;

    for (let index = 0; index < this.ingredient_arr.length; index++) {
      if (object._id == this.drink.ingredients[index]) {
        is_in = true;
      }
    }

    return is_in;
  }
/**
 * Metodo que checkea los campos de los ingredientes son validos
 * 
 */
  is_valid(){
    let valid=true
    let aux_name=[]
    for (let index = 0; index < this.ingredient_arr.length; index++) {
      aux_name.push(this.ingredient_arr[index].name)
    }
      for (let r = 0; r < this.form.value.ingredients.length; r++) {    
        if(!aux_name.includes(this.form.value.ingredients[r].ingredients)){
          valid=false
        }
      }
      return valid
  }

/**
 * Metodo que edita el trago en la base de datos usando el servicio
 * 
 */
  editDrink() {

    let ing:String[]=[];
            this.form.value.ingredients.forEach((item) => {
              for (let index = 0; index < this.ingredient_arr.length; index++) {
                if(item.ingredients==this.ingredient_arr[index].name){
                  ing.push(this.ingredient_arr[index]._id)
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

      this.updating=true;
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
/**
 * Checkea para ver si tiene por lo menos un ingrediente
 * 
 */
  mas_de_uno(){
    
    if(this.drink_ingredients.length!=0){
      return false
    }else{
      return true
    }
  }


/**
 * Navega a la vista anterior
 * 
 */
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

/**
 * detecta un cambio en el input de ingredientes
 * 
 */
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
/**
 * actualiza el array de autocompeltar cuando se le hace click de manera de que solo salgan los ing que cumplirian el autocompletar de ingrediente
 * 
 */
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

/**
 * 
 * Aañade un campo el form de ingredientes
 */
  addIngGroup() {
    return this._builder.group({
      ingredients: ["", Validators.required],
    });
  }
/**
 * Inserta un ingrediente en el array que se usa en el form
 * 
 */
  addIng() {
    this.IngArray.push(this.addIngGroup());
  }
/**
 * Borra ingrediente en la posicion especificada
 * @param {number} index posicion del ing que se borra
 * 
 */
  deleteIng(index) {
    this.IngArray.removeAt(index);
  }
/**
 * Obtiene los ingredientes de el form array
 * @returns aray de ingredientes
 */
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
/**
 * Submit del form de crear ingrediente 
 * 
 */
  addIngredient(){
    
    if(this.main_image_ing!=null){
      this.updatingIng=true;
      let ing: ingredient = {
        name: this.form_ing.value.name_ing,
        category: this.form_ing.value.category_ing,
        photo: this.main_image_ing,
        _id: "",
        available: true,
      };
      this.ing_service.createIngredient(ing).subscribe((res) => {
        this.getIngredients2()
        this.form_ing= this._builder.group({
          name_ing: ["", Validators.required],
          category_ing: ["", Validators.required],
        });
        this.main_image_ing=null 
        this.createIngredient=false;
      });
    } else {
      const response = alert(
        "No ha subido ninguna imagen. Por favor, suba una."
      );
    }
    
  }
/**
 * Se trae a todos los ingredientes nuevamente despues de crear el ingresiente
 * 
 */
  getIngredients2() {
    this.ingredient_arr_aux=[];
    this.ingredient_arr=[];
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
      this.updatingIng=false;
      this.loading = false;
    });
  }
/**
 * 
 * Muestra la vista de crear ingrediente
 */
  addNewIng(){
    this.createIngredient=true;
 
  }
/**
 * 
 * Regresa a la vista de editar trago
 */
  notAddIng(){
    this.createIngredient=false;
  }



}
