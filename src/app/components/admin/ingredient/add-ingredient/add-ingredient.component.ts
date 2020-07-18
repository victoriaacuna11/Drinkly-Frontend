import { Component, OnInit } from "@angular/core";
import { IngredientService } from "src/app/services/ingredient.service";
import { ingredient } from "./../../../../models/ingredient";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoriesService } from 'src/app/services/categories.service';
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-add-ingredient",
  templateUrl: "./add-ingredient.component.html",
  styleUrls: ["./add-ingredient.component.scss"],
})
export class AddIngredientComponent implements OnInit {

  /**
   * @ignore
   */
  selectedFile: File = null;
  /**
   * Categorías de los ingredientes.
   */
  categories: String[] = null;
  /** Formulario para la creación del ingrediente.
   * @type {FormGroup}
   */
  form: FormGroup;
  /**
   * Guarda la imagen del ingrediente.
   * @type {String}
   * @default {null}
   */
  main_image: String=null;
  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar: Boolean;
  /**
   * Indica si se está enviando la información a la DB para crear el ingrediente.
   * @type {Boolean}
   */
  updating:Boolean=false;
  
  constructor(
    private service: IngredientService,
    private _builder: FormBuilder,
    private route: Router,
    private categoryService: CategoriesService,
    private storage: AngularFireStorage
  ) {
    this.form = this._builder.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.categories=this.categoryService.getCategories();
  }

  /**
   * Verifica el formulario y añade el ingrediente a la DB.
   * @returns {void}
   */
  addIngredient():void {
    if(this.main_image!=null){
      this.updating=true;
      const ingredient: ingredient = {
        name: this.form.value.name,
        category: this.form.value.category,
        photo: this.main_image,
        _id: "",
        available: true,
      };
      console.log(ingredient);
      this.service.createIngredient(ingredient).subscribe((res) => {
        this.route.navigate(["admin/ingredient"]);
      });
    } else {
      const response = alert(
        "No ha subido ninguna imagen. Por favor, suba una."
      );
    }
    
  }

  /**
   * Navega a la lista de ingredientes.
   * @returns {void}
   */
  goBack():void {
    this.route.navigate(["admin/ingredient"]);
  }

  /**
   * Le permite al usuario subir una imagen desde un archivo de su coputadora.
   * @param {any} event - evento donde el usuario selecciona la imagen.
   * @returns {void}
   */
  uploadEnRes(event:any):void {
    this.main_image = event.thumbnail;
  }

  /**
   * Elimina la iamgen de firebase y le permite al usuario subir otra.
   * @param {any} url - link de la imagen guarda en firebase.
   * @returns {any}
   */
  changeImage(url:any):any {
    return this.storage.storage
      .refFromURL(url)
      .delete()
      .then((res) => {
        this.main_image = null;
      });
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
}
