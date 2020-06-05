import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bars-list',
  templateUrl: './bars-list.component.html',
  styleUrls: ['./bars-list.component.scss']
})
export class BarsListComponent implements OnInit {
  bars: object[] = [
    {
      title: "Bar360",
      subtitle: "Altamira",
      main_image: "assets/images/restaurantbarcaracasAFP 1.png",
    },
    {
      title: "Bar360",
      subtitle: "Altamira",
      main_image: "assets/images/restaurantbarcaracasAFP 1.png",
    },
    {
      title: "Bar360",
      subtitle: "Altamira",
      main_image: "assets/images/restaurantbarcaracasAFP 1.png",
    },
    {
      title: "Bar360",
      subtitle: "Altamira",
      main_image: "assets/images/restaurantbarcaracasAFP 1.png",
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
