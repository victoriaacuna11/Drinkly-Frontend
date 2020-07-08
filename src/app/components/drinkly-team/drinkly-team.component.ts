import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { BarService } from 'src/app/services/bar.service';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-drinkly-team',
  templateUrl: './drinkly-team.component.html',
  styleUrls: ['./drinkly-team.component.scss']
})
export class DrinklyTeamComponent implements OnInit {

  sidebar: Boolean;
  users:number;
  recipes:number;
  bars:number;
  loadingBars:Boolean=true;
  loadingDrinks:Boolean=true;
  loadingUsers:Boolean=true;


  constructor(
    private route: Router,
    private _location:Location,
    private _userService: UserService,
    private _barService: BarService,
    private _drinkService: DrinkService,
  ) { }

  ngOnInit() {
    this.getBars();
    this.getDrinks();
    this.getUsers();
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  postBusiness(){
    this.route.navigate(["post-your-business"]);
  }

  goBack(){
    this._location.back()
  }

  getBars(){
    this._barService.getBars().subscribe((res:any) => {
      let barAv = [];
      let bars = [...res.data];
      bars.forEach(item => {
        if(item.available){
          barAv.push(item);
        }
      })
      this.bars=barAv.length;
      this.loadingBars=false;
    } )
  }

  getDrinks(){
    this._drinkService.getDrinks().subscribe((res:any) => {
      let available = [];
      let drinks = [...res.data];
      drinks.forEach(item => {
        if(item.available){
          available.push(item);
        }
      })
      this.recipes=available.length;
      this.loadingDrinks=false;
    } )
  }

  getUsers(){
    this._userService.getUsers().subscribe((res:any) => {
      let available = [];
      let user = [...res.data];
      user.forEach(item => {
        if(item.available){
          available.push(item);
        }
      })
      this.users=available.length;
      this.loadingUsers=false;
    } )
  }

  
  

}
