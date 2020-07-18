import { AuthService } from "src/app/services/auth.service";
import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private auth_svc: AuthService, private router: Router) {}

  /**
   * Guard que restringe acceso a una ruta si el usuario logueado no es administrador
   * @returns {boolean} true si es admin, false si no
   */
  async canActivate() {

    if(this.auth_svc.loggedIn()){
      let x = await this.auth_svc.getAdmin().toPromise();
      if (x) {
        return true;
      } 
    }
    this.router.navigateByUrl("/profile");
    return false;

  }
}
