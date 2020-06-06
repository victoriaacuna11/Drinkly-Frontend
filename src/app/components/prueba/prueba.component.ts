import { Component, OnInit } from '@angular/core';
import {userP} from './../../models/user-p';
import {PruebaService} from '../../services/prueba.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {
  users : userP[] = [];
  
  constructor(private prueba : PruebaService, private route: Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.prueba.getUsers().subscribe((res:any) => this.users = [...res.data]);

  }

  createUser(){
    this.route.navigate(['add-prueba']);
  }

  editUser(user: userP){
    user.editable=true;
    console.log(user.editable)
  }

  deleteUser(id){
    // console.log(id);
    this.prueba.deleteUser(id).subscribe((res:any) => this.getUsers());
  }

}
