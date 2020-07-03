import { AuthService } from "src/app/services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
 
  user: any;
  admin: Boolean = false;
  userLoading: Boolean;
  sidebar: Boolean;

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
      (profile:any) => {
        this.user = profile.user;
        this.userLoading = false;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );
  }

  goEdit(id){
    this.router.navigate(['edit-user', id]);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
}
