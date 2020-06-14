import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  isOpen: boolean = false;
  isAdmin: boolean;
  isLogged: boolean;

  constructor(private auth_svc: AuthService, private router: Router) {}

  ngOnInit() {
    // if (this.auth_svc.isAdmin() === null) {
    //   this.isAdmin === false;
    // } else {
    this.isAdmin = this.auth_svc.isAdmin();
    this.isLogged = this.auth_svc.loggedIn();
    // }
  }

  getOut() {
    this.auth_svc.logout();
    console.log("Cerraste sesión");
    this.router.navigateByUrl("/login");
  }
}
