import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {

  drinks: object[] = [
    {
      title: "APPLETINI",
      subtitle: "Por Wilfredo Machado",
      main_image: "assets/images/martinigreen 2.png",
    },
    {
      title: "APPLETINI",
      subtitle: "Por Wilfredo Machado",
      main_image: "assets/images/martinigreen 2.png",
    },
    {
      title: "APPLETINI",
      subtitle: "Por Wilfredo Machado",
      main_image: "assets/images/martinigreen 2.png",
    },
    {
      title: "APPLETINI",
      subtitle: "Por Wilfredo Machado",
      main_image: "assets/images/martinigreen 2.png",
    },
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
