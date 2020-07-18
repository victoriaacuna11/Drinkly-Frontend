import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-bar',
  templateUrl: './test-bar.component.html',
  styleUrls: ['./test-bar.component.scss']
})
export class TestBarComponent implements OnInit {

  isOpen: boolean = false;
  isAdmin: any;
  isLogged: Boolean = true;
  sidebar_left: Boolean = false;
  btn =true;
  cancel = true;
  @Output() message= new EventEmitter<Boolean>();

  constructor(private auth_svc: AuthService, private router: Router) { }

  /**
   * Inicializa el componente, mostrando las opciones de navegación dependiendo de si el usuario está logueado o no, y si es
   * administrador o no.
   */
  async ngOnInit() {

    if (!this.auth_svc.loggedIn()) {
      this.isAdmin = false;
      this.isLogged = false;
    } else {
      this.isLogged = true;
      let x = await this.auth_svc.getAdmin().toPromise();
      this.isAdmin = x;
    }
  }

  /**
   * @ignore
   */
  getOut() {
    this.auth_svc.logout();
    console.log("Cerraste sesión");
    this.router.navigateByUrl("/login");
  }

  /**
   * Oculta o muestra el sidebar y emite este estado al componente que se esté mostrando para que se mueva
   */
  makeChange(){

    this.sidebar_left = !this.sidebar_left;   
    this.message.emit(this.sidebar_left)
      
  }

}
