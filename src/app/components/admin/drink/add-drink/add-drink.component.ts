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
/**
   * file para usar el servicio de firestorage
   */
  selectedFile: File = null;
/**
   * lista de las categorias para un usuario
   */
  categories: String[] = ["User", "Bartender"];
/**
   * lista de los ingredientes disponibles traidos de la base de datos
   */
  ingredient_arr: ingredient[] = [];
  /**
   * lista de los ingredientes traidos de la base de datos
   */
  ingredient_arr_aux: ingredient[] = [];
  /**
   * ingredientes del trago a crear
   */
  drink_ingredients = [];
  /**
   * imagen del trago a crear
   */
  main_image: String = null;
  /**
   * imagen del ingrediente a crear
   */
  main_image_ing: String = null;
  /**
   * lista de las categorias de los ingredientes
   */
  categories_ing:String[]=[]
  /**
   * drink que se creara
   */
  drink_created:drink;
  /**
   *  atributo que muestra y esconde la navbar
   */
  sidebar: Boolean;
  /**
   *  @ignore
   */
  show_ing:boolean;
  /**
   *  lista de ingredientes que cumplen con lo que se escribe en el input de seleccionar ingrediente
   */
  autocomplete:String[]=[];
  /**
   *  @ignore
   */
  autocompleteaux:Observable<String[]>;
  /**
   *  @ignore
   */
  control:FormControl=new FormControl;
/**
   * atributo que esconde y muestra la vista de crear un ingrediente
   */
  createIngredient:Boolean=false;
   /**
   * atributo que indica si se han cargado los datos traidos de la base de datos
   */
  loading:Boolean=true;
/**
   * atributo que nos indica si un drink se esta creando
   */
  updating:Boolean=false;
  /**
   * atributo que nos indica si un drink se esta creando
   */
  updatingIng:Boolean=false;


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
/**
 * Inicializa el componente
 * 
 */
  ngOnInit() {
    this.getIngredients();
    this.categories_ing=this.categoryService.getCategories();
  }
/**
 * 
 * Añade un campo para añadir ingredientes en el form
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
/**
 * Trae los ingredientes de la base de datos y los inserta en los multiples atributoa
 * 
 */
  getIngredients() {
    this.ingredient_arr=[];
    this.ingredient_arr_aux=[];
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

      this.autocompleteaux = this.control.valueChanges
        .pipe(
          startWith(''),
          map(val=> this.filter(val))
        )
      this.loading=false;
      this.updatingIng=false;
      //this.loading = false;
    });
  }


/**
 * @ignore
 * 
 */
  filter(val:string): String[] {
    
    return this.autocomplete.filter(option =>
      option.toLocaleLowerCase().indexOf(val.toLowerCase())===0
      )
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
 * Metodo que añade el trago en la base de datos usando el servicio
 * 
 */
  addDrink() {
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
            this.updating=true;
            let ing:String[]=[];
            this.form.value.ingredients.forEach((item) => {
              for (let index = 0; index < this.ingredient_arr.length; index++) {
                if(item.ingredients==this.ingredient_arr[index].name){
                  ing.push(this.ingredient_arr[index]._id)
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
/**
 * Checkea que se haya puesot mas de un ingrediente en el form
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
    this.route.navigate(["admin/drink"]);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

/**
 * 
 * Capta los cambios en los inputs de ingredientes
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
 * 
 * Añade in ingrediente en la base de datos usando el form
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
      this.service_ing.createIngredient(ing).subscribe((res) => {
        this.getIngredients()
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
 * 
 * Muestra el form de crear un nuevo ingrediente 
 */
  addNewIng(){
    this.createIngredient=true;
  }
/**
 * Regresa a la vista de añadir ingrediente
 * 
 */
  notAddIng(){
    this.createIngredient=false;
  }
  }
 

