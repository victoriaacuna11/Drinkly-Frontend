import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-drinkly-team',
  templateUrl: './drinkly-team.component.html',
  styleUrls: ['./drinkly-team.component.scss']
})
export class DrinklyTeamComponent implements OnInit {

  sidebar: Boolean;

  constructor(
    private route: Router,
    private _location:Location,
  ) { }

  ngOnInit() {
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  postBusiness(){
    this.route.navigate(["post-your-business"]);
  }

  goBack(){
    this._location.back()
  }
}
