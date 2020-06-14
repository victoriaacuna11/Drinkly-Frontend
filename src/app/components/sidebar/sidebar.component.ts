import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  constructor(private auth_svc: AuthService, private router: Router) {}

  isOpen: boolean = false;
  isAdmin: any;
  isLogged: Boolean = true;

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

  getOut() {
    this.auth_svc.logout();
    console.log("Cerraste sesión");
    this.router.navigateByUrl("/login");
  }
}
