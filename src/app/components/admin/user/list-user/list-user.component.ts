import { Router } from '@angular/router';
import { UserService } from './../../../../services/user.service';
import { user } from './../../../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  loading: Boolean = true;
  users: user[];
  userSelected: user;
  sidebar: Boolean;

  constructor(private service: UserService, private route: Router) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.service.getUsers().subscribe((res: any) => {
      this.users = [...res.data];
      this.loading = false;
    });
    console.log(this.users);
  }

  deleteUser(id) {
    this.service.deleteUser(id).subscribe((res) => {
      this.getUsers();
    });
  }

  giveAdmin(id){
    this.service.getUser(id).subscribe((res: any) => {
      this.userSelected = { ...res.data };
      this.userSelected.isAdmin = true;
      this.service
        .updateUser(this.userSelected)
        .subscribe((res) => {
          this.getUsers();
        });
    });
  }

  takeAdmin(id){
    this.service.getUser(id).subscribe((res: any) => {
      this.userSelected = { ...res.data };
      this.userSelected.isAdmin = false;
      this.service
        .updateUser(this.userSelected)
        .subscribe((res) => {
          this.getUsers();
        });
    });
  }

  inhabilitateUser(id) {
    this.service.getUser(id).subscribe((res: any) => {
      this.userSelected = { ...res.data };
      this.userSelected.available = false;
      this.service
        .updateUser(this.userSelected)
        .subscribe((res) => {
          this.getUsers();
        });
    });
  }

  habilitateUser(id) {
    this.service.getUser(id).subscribe((res: any) => {
      this.userSelected = { ...res.data };
      this.userSelected.available = true;
      this.service
        .updateUser(this.userSelected)
        .subscribe((res) => {
          this.getUsers();
        });
    });
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  goBack(){
    this.route.navigate(["admin"]);
  }

}
