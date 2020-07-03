import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  //CAMBIAR A TRUE
  loading: Boolean = false;
  sidebar: Boolean;
  constructor() { }

  ngOnInit() {
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

}
