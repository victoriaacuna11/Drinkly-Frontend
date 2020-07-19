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

  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar: Boolean;
  /**
   * Guarda la cantidad de usuarios disponibles en la página.
   */
  users:number;
  /**
   * Guarda la cantidad de tragos disponibles en la página.
   */
  recipes:number;
  /**
   * Guarda la cantidad de bares disponibles en la página.
   */
  bars:number;
  /**
   * Loader de los bares.
   */
  loadingBars:Boolean=true;
  /**
   * Loader de los tragos.
   */
  loadingDrinks:Boolean=true;
  /**
   * Loader de los users.
   */
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
   * Navega a la publicación del negocio.
   * @returns {void}
   */
  postBusiness():void{
    this.route.navigate(["post-your-business"]);
  }

  /**
   * Se regresa a la ruta previa.
   * @returns {void}
   */
  goBack():void{
    this._location.back()
  }

  /**
   * Trae los bares de la DB.
   * @returns {void}
   */
  getBars():void{
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

  /**
   * Trae los tragos de la DB.
   * @returns {void}
   */
  getDrinks():void{
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

  /**
   * Trae los usuarios de la DB.
   * @returns {void}
   */
  getUsers():void{
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
