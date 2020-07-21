import { AuthService } from "src/app/services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { DrinkService } from 'src/app/services/drink.service';
import { drink } from 'src/app/models/drink';
import { user } from 'src/app/models/user';
import { UserService} from 'src/app/services/user.service'



@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
 
  user: any;
  admin: Boolean = false;
  userLoading: Boolean;
  sidebar: Boolean;
  drinks:drink[]=[];
  drinksA:drink[]=[];
  quotes : String[] = [
    "El vino mejora con la edad. Tú mejoras con el vino", 
    "El día que el amor se convierta en vino tómatelo en serio",
    "La mente clara y la cerveza oscura",
    "Somos las cervezas que nos bebemos",
    "Por favor, si van a dar lata... que sea de cerveza",
    "Con cerveza, no hay tristeza",
    "Si la vida te da limones, pide sal y tequila",
    "Vinos y amigos, la mezcla perfecta",
    "Eres como un buen vino, cada día estás más bueno/a",
    "La vida empieza después de un vinito",
    "Salvemos el agua, bebamos vino",
    "Correr para ir a comprar vino cuenta como ejercicio",
    "Lo importante es lo de adentro... de la jarra",
  ]
  randomQuote:String;
  favorites:Boolean=false;
  editProfile=false;

  constructor(private router: Router, private auth_svc: AuthService, private service: DrinkService, private user_sv:UserService ) {}

  /**
   * Inicializa al componente, elige el quote a mostrar y se trae al usuario
   */
  ngOnInit() {
    this.chooseQuote();
    this.userLoading = true;
    this.getProfile();
  }

  /**
   * Borra los datos de local storage y navega al login, terminando tu sesión
   */
  getOut() {
    this.auth_svc.logout();
    this.router.navigateByUrl("/login");
  }

  /**
   * Se trae los datos del usuario de la base de datos
   */
  getProfile() {
    this.auth_svc.getProfile().subscribe(
      (profile:any) => {
        this.user = profile.user;
        this.getDrinks();
        
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  /**
   * Navega a la ruta de editar perfil con el id del usuario para mostrar su información
   * @param {string} id el id del usuario logueado
   */
  goEdit(id: string){
    this.router.navigate(['edit-user', id]);
  }

  /**
   * Setea el atributo local que mueve el contenido cuando sale el sidebar
   * @param {any} $event El evento que es pasado cuando el ícono del sidebar es clickeado
   * @returns {void} 
   */
  getMessage($event: any): void{
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  /**
   * Se trae los tragos y llena el atributo local con los favoritos del usuario para mostrarlos
   */
  getDrinks() {
    
    this.service.getDrinks().subscribe((res: any) => {
      this.drinks = [...res.data];
      this.drinks.forEach(i => {
        if(i.available && this.user.favorites.includes(i._id)){
          this.drinksA.push(i);
        }
      })
      this.userLoading = false;
      
    })
  }

  /**
   * Te lleva a la receta del trago con el id
   * @param {string} id el id del trago
   */
  detail(id: string){
    this.router.navigate(['drink/', id]);
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

  }
  is_fav(id:any){
    if(this.user.favorites.includes(id)){
      return true
    }else{
      return false
    }
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

    this.user_sv.updateUser(user).subscribe((res:any) => {
    });
  }

  /**
   * Elige un quote aleatorio para mostrar
   */
  chooseQuote(){
    this.randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }


  /**
   * Oculta o muestra los tragos favoritos del usuario en la vista para móvil
   */
  showFavorites(){
    this.favorites=!this.favorites;
  }

  /**
   * Navega a la lista de tragos
   */
  goDrinks(){
    this.router.navigate(["drinks"]);
  }

  

}
