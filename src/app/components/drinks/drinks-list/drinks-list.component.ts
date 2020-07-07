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

  drinks: drink[]=[];
  loading: Boolean = true;
  sidebar: Boolean;
  drinksA: drink[] =[];
  aux;
  filterPost: string = "qlqsa";
  user:user;
  

  constructor(private service: DrinkService, 
              private route: Router, 
              private data: SharedService, 
              private auth_svc:AuthService, 
              private user_s:UserService) { }

  ngOnInit() {
    this.data.currentMsg.subscribe(m => this.filterPost = m)
    this.getDrinks();
  }

  detail(id){
    this.route.navigate(['drink/', id]);
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

  getDrinks() {
    
    this.service.getDrinks().subscribe((res: any) => {
      this.drinks = [...res.data];
      console.log(this.drinks);
      this.drinks.forEach(i => {
        if(i.available){
          this.drinksA.push(i);
        }
      })
      this.getProfile();
      
    })
  }

  goToFilter(){
    this.route.navigate(['drinks/filter/']);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

}
