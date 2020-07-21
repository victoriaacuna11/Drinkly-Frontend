import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';
import { Router } from '@angular/router';
import { drink } from 'src/app/models/drink';
import { user } from 'src/app/models/user';
import { AuthService} from 'src/app/services/auth.service'
import { UserService} from 'src/app/services/user.service'

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {
/**
 * Lista de los drinks traidos de la base de datos
 */
  drinks: drink[]=[];
  /**
 * atributo que indica cuando se hayan traido todas las cosas de la base de datos
 */
  loading: Boolean = true;
  /**
 * atributo que muestra y esconde el sidebar
 */
  sidebar: Boolean;
  /**
 *  Lista de los drinks disponibles traidos de la base de datos
 */
  drinksA: drink[] =[];
  /**
 *  @ignore
 */
  filterPost: string = "qlqsa";
  /**
 * usuario que se encuentra loggeado en el momento
 */
  user:user;
  
  

  constructor(private service: DrinkService, 
              private route: Router, 
              private data: SharedService, 
              private auth_svc:AuthService, 
              private user_s:UserService) { }
/**
 * Inicializa el componente
 * 
 */
  ngOnInit() {
    this.data.currentMsg.subscribe(m => this.filterPost = m)
    this.getDrinks();
  }
  /**
 * 
 * Nos lleva a la vista detallada del trago
 * @param {string} id id del drink que se quiere ver el especifico
 */
  detail(id){
    this.route.navigate(['drink/', id]);
  }
/**
 * 
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
        this.loading = false;
      },
      (err)=>{
        console.log(err)
        return false
      }
      
    )

    
  }
/**
 * Trae los tragos de la base de datos
 * 
 */
  getDrinks() {
    
    this.service.getDrinks().subscribe((res: any) => {
      this.drinks = [...res.data];
      this.drinks.forEach(i => {
        if(i.available){
          this.drinksA.push(i);
        }
      })
      this.getProfile();
      
    })
  }
/**
 * Navega a la vista del filter por ingredientes
 * 
 */
  goToFilter(){
    this.route.navigate(['drinks/filter/']);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
/**
 * Navega al home
 * 
 */
  goBack(){
    //vete al home
    this.route.navigate(['']);
  }

}
