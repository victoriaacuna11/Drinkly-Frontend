import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {

  drinks: object[];
  loading:Boolean=true;
  // object[] = [
  //   {
  //     title: "APPLETINI",
  //     subtitle: "Por Wilfredo Machado",
  //     main_image: "assets/images/martinigreen 2.png",
  //   },
  //   {
  //     title: "APPLETINI",
  //     subtitle: "Por Wilfredo Machado",
  //     main_image: "assets/images/martinigreen 2.png",
  //   },
  //   {
  //     title: "APPLETINI",
  //     subtitle: "Por Wilfredo Machado",
  //     main_image: "assets/images/martinigreen 2.png",
  //   },
  //   {
  //     title: "APPLETINI",
  //     subtitle: "Por Wilfredo Machado",
  //     main_image: "assets/images/martinigreen 2.png",
  //   },
  // ];
  
  constructor(private service: DrinkService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks(){
    this.service.getBars().subscribe((res:any) => {
      this.drinks=[...res.data];
      console.log(this.drinks);
      this.loading=false;
    })
  }
}
