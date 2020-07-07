import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drinkly-team',
  templateUrl: './drinkly-team.component.html',
  styleUrls: ['./drinkly-team.component.scss']
})
export class DrinklyTeamComponent implements OnInit {

  sidebar: Boolean;

  constructor(
    private route: Router,
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
}
