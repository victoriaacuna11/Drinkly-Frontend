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
  
  loading: Boolean = true;
  sidebar: Boolean;
  receta: drink;
  ingredients: ingredient[];
  user:user;
  ingreAux: ingredient;


  constructor(private service: DrinkService, 
              private route: Router, 
              private rout: ActivatedRoute, 
              private service_ing: IngredientService,
              private _location:Location, 
              private user_s:UserService,
              private auth_svc:AuthService) { }

  ngOnInit() {
    this.getReceta();
  }

  // getIngredients() {
  //   var i: number;
  //   for(i=0; i<this.receta.ingredients.length; i++){
  //     this.service_ing.getIngredient(this.receta.ingredients[i]).subscribe( (r:any) => {
  //       this.ingreAux = {...r.data};
  //       this.receta.ingredients[i] = this.ingreAux.name;
  //       console.log(this.receta.ingredients[i]);
  //       console.log(this.load)
  //     })
  //   }
  //   console.log(this.load)
  // }

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

  getIngredients(){
    this.service_ing.getIngredients().subscribe((res:any) => {
      this.ingredients=[...res.data];
      this.getProfile()  
      })
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

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

  goBack(){
    this._location.back()
  }
  is_fav(id:any){
    if(this.user.favorites.includes(id)){
      return true
    }else{
      return false
    }
  }
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
