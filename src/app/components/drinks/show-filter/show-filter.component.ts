import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';
import { Router, ActivatedRoute } from '@angular/router';
import { drink } from 'src/app/models/drink';

@Component({
  selector: 'app-show-filter',
  templateUrl: './show-filter.component.html',
  styleUrls: ['./show-filter.component.scss']
})
export class ShowFilterComponent implements OnInit {

  sidebar: Boolean;
  constructor(
    private service: DrinkService,
    private route: Router,
    private routeSV: ActivatedRoute,
  ) { }

  filter;
  aux;
  drinks:drink[]=[];
  drinksA:drink[]=[];
  loading=true

  ngOnInit() {
    this.aux=this.routeSV.snapshot.paramMap.get('filter');
    this.filter=this.aux.split(',')
    this.getFilteredDrinks();
    

    console.log(this.filter)
  }
  getFilteredDrinks() {
    this.service.filteredDrink(this.aux).subscribe((res: any) => {
      this.drinks = res.data;
      this.drinks.forEach(i =>{
        if(i.available){
          this.drinksA.push(i);
        }
      })
      this.loading = false;
      this.filter=this.aux.split(',')
      console.log(this.drinks)
    });
    
  }

  getMessage($event){
    this.sidebar = $event;
  }

}
