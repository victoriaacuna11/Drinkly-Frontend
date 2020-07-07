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

  constructor(private router: Router, private auth_svc: AuthService, private service: DrinkService, private user_sv:UserService ) {}

  ngOnInit() {
    this.userLoading = true;

    this.getProfile();
  }

  getOut() {
    this.auth_svc.logout();
    console.log("Cerraste sesión");
    this.router.navigateByUrl("/login");
  }

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

  goEdit(id){
    this.router.navigate(['edit-user', id]);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  getDrinks() {
    
    this.service.getDrinks().subscribe((res: any) => {
      this.drinks = [...res.data];
      console.log(this.drinks);
      this.drinks.forEach(i => {
        if(i.available && this.user.favorites.includes(i._id)){
          this.drinksA.push(i);
        }
      })
      this.userLoading = false;
      
    })
  }

  detail(id){
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

    console.log(this.user)
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

    console.log(user);
    this.user_sv.updateUser(user).subscribe((res:any) => {
    });
  }

}
