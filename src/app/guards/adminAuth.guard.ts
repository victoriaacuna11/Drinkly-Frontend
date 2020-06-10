import { AuthService } from "src/app/services/auth.service";
import { Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private auth_svc: AuthService, private router: Router) {}

  async canActivate() {
    let x = await this.auth_svc.getAdmin().toPromise();

    if (x) {
      return true;
    } else {
      this.router.navigateByUrl("/profile");
      return false;
    }
  }
}
