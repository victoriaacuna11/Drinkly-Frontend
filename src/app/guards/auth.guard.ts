import { AuthService } from "src/app/services/auth.service";
import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth_svc: AuthService, private router: Router) {}

  canActivate() {
    if (this.auth_svc.loggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
