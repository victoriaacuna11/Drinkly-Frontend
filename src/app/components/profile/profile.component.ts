import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  aux: any = {};
  user: Object;
  userLoading: Boolean;

  constructor(private router: Router, private auth_svc: AuthService) {}

  ngOnInit() {
    this.userLoading = true;
    this.getProfile();
  }

  getOut() {
    this.auth_svc.logout();
    console.log("Cerraste sesión");
    this.router.navigateByUrl("/login");
  }

  getProfile() {
    this.auth_svc.getProfile().subscribe(
      (profile) => {
        this.aux = profile;
        this.user = this.aux.user;
        this.userLoading = false;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }
}
