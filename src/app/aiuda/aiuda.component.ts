import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-aiuda',
  templateUrl: './aiuda.component.html',
  styleUrls: ['./aiuda.component.scss']
})
export class AiudaComponent implements OnInit {

  constructor(private router: Router, private auth_svc: AuthService) { }

  ngOnInit() {
  }

  getOut() {
    this.auth_svc.logout();
    console.log("Cerraste sesión");
    this.router.navigateByUrl("/login");
  }

}
