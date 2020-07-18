import { Component, OnInit } from "@angular/core";
import { ingredient } from "src/app/models/ingredient";
import { IngredientService } from "src/app/services/ingredient.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CategoriesService } from "src/app/services/categories.service";
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: "app-edit-ingredient",
  templateUrl: "./edit-ingredient.component.html",
  styleUrls: ["./edit-ingredient.component.scss"],
})
export class EditIngredientComponent implements OnInit {
  /**
   * Loader (indica si la data ya se trajo o no de la DB)
   * @type {Boolean}
   * @default {true}
   */
  loading: Boolean = true;
  /**
   * Ingrediente que se va a editar.
   */
  ingredient: ingredient;
  /** Formulario para la edición del ingrediente.
   * @type {FormGroup}
   */
  form: FormGroup;
  /**
   * Guarda la imagen del ingrediente.
   * @type {String}
   */
  main_image: String;
  /**
   * Indica si se está enviando la información a la DB para editar el ingrediente.
   * @type {Boolean}
   */
  updating:Boolean=false;
  /**
   * Categorías de los ingredientes.
   */
  categories: String[];
  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar:Boolean;

  constructor(
    private service: IngredientService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private categoriesService: CategoriesService,
    private storage: AngularFireStorage
  ) {
    this.form = this._builder.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.getIngredient();
  }

  /**
   * Trae el ingrediente que s eva a editar de la DB
   * @returns {void}
   */
  getIngredient():void {
    const id = this.routeSV.snapshot.paramMap.get("id");
    this.categories = this.categoriesService.getCategories();
    this.service.getIngredient(id).subscribe((res: any) => {
      this.ingredient = { ...res.data };
      this.main_image=this.ingredient.photo;
      this.form = this._builder.group({
        name: [this.ingredient.name, Validators.required],
        category: [this.ingredient.category, Validators.required]
      });
      this.loading = false;
    });
  }

  /**
   * Verifica el formulario y edita el ingrediente en la DB.
   * @returns {void}
   */
  editIngredient():void {
    
    var ingredient: ingredient = {
      name: this.form.value.name,
      category: this.form.value.category,
      photo: this.main_image,
      _id: this.ingredient._id,
      available: true,
    };
    console.log(ingredient);
    console.log(this.ingredient.photo);

    if (this.main_image != null) {
      this.updating=true;
      console.log(ingredient);
      this.service.updateIngredient(ingredient).subscribe((res) => {
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
    if(this.main_image==null || this.main_image!=this.ingredient.photo){
      const response = alert(
        "Ya borró la imagen. Por favor, tiene que subir una y guardar el cambio."
      );
    } else {
      this.route.navigate(["admin/ingredient"]);
    }
    
  }

  /**
   * Le permite al usuario subir una imagen desde un archivo de su coputadora.
   * @param {any} event - evento donde el usuario selecciona la imagen.
   * @returns {void}
   */
  uploadEnRes(event:any): void {
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
