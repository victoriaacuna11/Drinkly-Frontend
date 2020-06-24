import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isOpen: boolean = false;
  isAdmin: any;
  isLogged: Boolean = true;

  constructor(private auth_svc: AuthService, private router: Router) { }

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
