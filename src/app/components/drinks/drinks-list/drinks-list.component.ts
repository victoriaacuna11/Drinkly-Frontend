import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-drinks-list',
  templateUrl: './drinks-list.component.html',
  styleUrls: ['./drinks-list.component.scss']
})
export class DrinksListComponent implements OnInit {

  drinks: object[];
  loading: Boolean = true;
  

  constructor(private service: DrinkService) { }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks() {
    this.service.getDrinks().subscribe((res: any) => {
      this.drinks = [...res.data];
      console.log(this.drinks);
      this.loading = false;
    })
  }
}
