import { SharedService } from './../../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';
import { Router } from '@angular/router';
import { drink } from 'src/app/models/drink';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {

  drinks: drink[];
  loading: Boolean = true;
  sidebar: Boolean;
  drinksA: drink[] =[];
  filterPost: string = "qlqsa";
  

  constructor(private service: DrinkService, private route: Router, private data: SharedService) { }

  ngOnInit() {
    this.data.currentMsg.subscribe(m => this.filterPost = m)
    this.getDrinks();
  }

  getDrinks() {
    
    this.service.getDrinks().subscribe((res: any) => {
      this.drinks = [...res.data];
      console.log(this.drinks);
      this.drinks.forEach(i => {
        if(i.available){
          this.drinksA.push(i);
        }
      })
      this.loading = false;
    })
  }

  goToFilter(){
    this.route.navigate(['drinks/filter/']);
  }

  getMessage($event){
    this.sidebar = $event;
  }

}
