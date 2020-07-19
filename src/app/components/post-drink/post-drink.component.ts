import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { SendMailService } from 'src/app/services/send-mail.service';
import { AuthService } from 'src/app/services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-post-drink',
  templateUrl: './post-drink.component.html',
  styleUrls: ['./post-drink.component.scss']
})
export class PostDrinkComponent implements OnInit {

  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar: Boolean;
  /**
   * Formulario para postear la receta.
   */
  form: FormGroup;
  /**
   * Usuario registrado.
   */
  user: any;
  /**
   * Indica si ya se trajo o no la info de la DB.
   */
  loading:Boolean=true;
  /**
   * Indica si se está o no enviando la publicación.
   */
  sending:Boolean=false;
  /**
   * Indica si ya se envió la publicación.
   */
  sent:Boolean=false;

  constructor(
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private service: SendMailService,
    private authService: AuthService,
    private _location:Location,
  ) { 
    this.form = this._builder.group({
      name: ["",Validators.required],
      description: ["",Validators.required],
      recipe: ["",Validators.required],
      anonymous: false,
      ingredients: this._builder.array([
        this.addIngredientGroup()
      ]),
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe( (res:any) => {
      this.user = res.user;
      this.loading=false;
    })
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
   * Crea el form group para añadir otro ingrediente.
   * @returns {any}
   */
  addIngredientGroup():any {
    return this._builder.group({
      ingredient: ["", Validators.required],
    });
  }

  get IngredientArray() {
    return <FormArray>this.form.get("ingredients");
  }

  /**
   * Le permite al usuario añadir otro ingrediente.
   * @returns {void}
   */
  addIngredient():void {
    this.IngredientArray.push(this.addIngredientGroup());
  }

  /**
   * Le permite al usuario eliminar un ingrediente.
   * @param {number} index - index del ingrediente.
   * @returns {void}
   */
  deleteIngredient(index:number):void {
    this.IngredientArray.removeAt(index);
  }

  /**
   * Verifica el form y hace la publicación.
   * @returns {void}
   */
  postRecipe():void{
    this.sending=true;
    console.log(this.form.value.recipe)
    let ingredients: String [] = [];
    this.form.value.ingredients.forEach(element => {
      ingredients.push(element.ingredient);
    });
    let message:String='El usuario desea que le den créditos por la receta.'
    if(this.form.value.anonymous){
      message='El usuario no desea que le den créditos por la receta. La publicó como anónimo.'
    }
    let data = {
      email: this.user.email,
      username: this.user.user_name,
      owner_name: this.user.f_name,
      name: this.form.value.name,
      description: this.form.value.description,
      recipe: this.form.value.recipe,
      ingredients: ingredients,
      message: message,
    }
    console.log(data);
    this.service.postRecipe(data).subscribe(res => {
      this.service.sendEmailUser(data).subscribe(res => {
        this.sent=true;
      })
    })
  }

  /**
   * Navega al home
   * @returns {void}
   */
  goHome():void{
    this.route.navigate([""]);
  }

  /**
   * Regresa a la ruta anterior.
   * @returns {void}
   */
  goBack():void{
    this._location.back()
  }

}
