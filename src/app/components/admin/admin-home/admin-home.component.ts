import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { BarService } from 'src/app/services/bar.service';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  //CAMBIAR A TRUE
  loading: Boolean = false;
  sidebar: Boolean;
  users:number;
  recipes:number;
  bars:number;
  loadingBars:Boolean=true;
  loadingDrinks:Boolean=true;
  loadingUsers:Boolean=true;

  constructor(private route: Router,
    private _location:Location,
    private _userService: UserService,
    private _barService: BarService,
    private _drinkService: DrinkService,) {

  }

  /**
   * Inicializa el componente
   */
  ngOnInit() {
    this.getBars();
    this.getDrinks();
    this.getUsers();
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
     * Trae los bares de la base de datos y guarda la cantidad existente que se encuentra disponible
     * para poder mostrarselo a l administrador
     * @returns {void}
     */
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

  /**
     * Trae los tragos de la base de datos y guarda la cantidad existente que se encuentra disponible
     * para poder mostrarselo a l administrador
     * @returns {void}
     */
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

  /**
     * Trae los usuarios de la base de datos y guarda la cantidad existente que se encuentra disponible
     * para poder mostrarselo a l administrador
     * @returns {void}
     */
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
