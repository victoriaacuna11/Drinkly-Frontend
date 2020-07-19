import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DrinkService } from 'src/app/services/drink.service';
import { drink } from 'src/app/models/drink';
import { IngredientService } from "src/app/services/ingredient.service";
import { ingredient } from "src/app/models/ingredient";
import { database } from 'firebase';
import {Location} from '@angular/common';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  
  /**
   * Indica si ya se trajo la informacion de la base de datos
   */
  loading: Boolean = true;
  /**
   * Indica si el sidebar esta abierto
   */
  sidebar: Boolean;
  /**
   * Guarda la receta que se esta mostrando
   */
  receta: drink;
  /**
   * Guarda los ingredientes de la receta que se muestra
   */
  ingredients: ingredient[];
  /**
   * Guarda el usuario que esta viendo la receta
   */
  user:user;


  constructor(private service: DrinkService, 
              private route: Router, 
              private rout: ActivatedRoute, 
              private service_ing: IngredientService,
              private _location:Location, 
              private user_s:UserService,
              private auth_svc:AuthService) { }

  /**
   * Inicializa el componente
   */
  ngOnInit() {
    this.getReceta();
  }

  /**
   * Obtiene el nombre de los ingredientes de la receta 
   * @param {string} id El id del ingrediente del que se quiere obtener el nombre
   * @returns {string} El nombre del ingrediente
   */
  getIngredientName(id: String){
    let name = '';
    let found = false;
    let i=0;
    while(!found && i<this.ingredients.length){
       if(this.ingredients[i]._id==id){
         found = true;
         name = this.ingredients[i].name.toString();
       }
      i=i+1;
    }
    return name
    
  }

  /**
   * Obtiene los ingredientes de la base de datos
   * @returns {void}
   */
  getIngredients(){
    this.service_ing.getIngredients().subscribe((res:any) => {
      this.ingredients=[...res.data];
      this.getProfile()  
      })
  }

  /**
   * Setea el atributo local que mueve el contenido cuando sale el sidebar
   * @param {any} $event El evento que es pasado cuando el ícono del sidebar es clickeado
   * @returns {void} 
   */
  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  /**
   * Obtiene la receta de la base de datos en base al id de la ruta
   * @returns {void}
   */
  getReceta(){
    const id = this.rout.snapshot.paramMap.get('id');
    this.service.getDrink(id).subscribe( (r:any) => {
      this.receta = {...r.data};
      // this.getIngredients();
      console.log('Drink...');
      console.log(this.receta);
      console.log(this.receta.ingredients.length)
      this.getIngredients();
    })
    
  }

  /**
 * Navega al home
 * 
 */
  goBack(){
    this._location.back()
  }

  /**
 * Checkea si el trago esta en el array de favoritos del usuario
 * @param {string} id id del card del trago que se checkeara
 */
  is_fav(id:any){
    if(this.user.favorites.includes(id)){
      return true
    }else{
      return false
    }
  }

  /**
 * Añade el trago al array de favoritos del usuario
 * @param {Event}  event evento para evitar que se progague la accion
 * @param {any} drink drink que se añadira al array de favoritso del usuario
 */
  fav(event:Event ,drink:any){
    event.stopPropagation();
    if(this.user.favorites.includes(drink)){

      for (let index = 0; index < this.user.favorites.length; index++) {
        if(this.user.favorites[index]==drink){
          this.user.favorites.splice(index,1);
        }
      }

      this.updateUser();

    }else{
      this.user.favorites.push(drink);
      this.updateUser();

    }

    console.log(this.user)
  }

  /**
 * Actualiza al usuario usando el servicio con los nuevos favoritos
 * 
 */
  updateUser(){

    var user: user = {
      f_name: this.user.f_name,
      l_name: this.user.l_name,
      user_name: this.user.user_name,
      password: this.user.password,
      email: this.user.email,
      _id: this.user._id,
      available: true,     
      isAdmin: this.user.isAdmin,
      birthday: this.user.birthday,
      favorites: this.user.favorites,
    };

    console.log(user);
    this.user_s.updateUser(user).subscribe((res:any) => {
    });
  }

  /**
 * 
 * Trae al usuario de la base de datos
 */
  getProfile(){
    this.auth_svc.getProfile().subscribe(
      (profile:any)=>{
        this.user=profile.user;
        console.log(this.user)
        this.loading = false;
      },
      (err)=>{
        console.log(err)
        return false
      }
      
    )

    
  }

}
