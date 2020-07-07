import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';
import { Router } from '@angular/router';
import { drink } from 'src/app/models/drink';
import { Bar } from 'src/app/models/bar';
import { BarService } from 'src/app/services/bar.service';
import { ZoneService } from 'src/app/services/zone.service';
import { zone } from 'src/app/models/zone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bars: Bar[];
  zones:zone[];
  barsAv: Bar[] =[];
  drinks: drink[]=[];
  elegidos: drink[]=[];
  eleg: number[];
  loading: Boolean = true;
  sidebar: Boolean;
  drinksA: drink[] =[];
  aux;
  filterPost: string = "qlqsa";

  constructor(private service: DrinkService, private route: Router, private serviceB: BarService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.getDrinks();
    this.getZones();
  }

  getMessage($event){
    this.sidebar = $event;
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
      // this.eleg[0] = Math.floor(Math.random() * ((this.drinksA.length)-3))
      // this.eleg[1] = this.eleg[0]+1
      // this.eleg[2] = this.eleg[1]+1
      // this.elegidos[0] = this.drinksA[this.eleg[0]]
      // this.elegidos[1] = this.drinksA[this.eleg[1]]
      // this.elegidos[2] = this.drinksA[this.eleg[2]]
      this.loading = false;
    })
  }

  getZone(id){
    let name = '';
    let found = false;
    let i=0;
    while(!found && i<this.zones.length){
       if(this.zones[i]._id==id){
         found = true;
         name = this.zones[i].name.toString();
       }
      i=i+1;
    }
    return name
 
   }

   detail(id){
    this.route.navigate(['bar/', id]);
  }

  getBars(){
    this.serviceB.getBars().subscribe((res:any) => {
      this.bars=[...res.data];
      
      this.bars.forEach(item => {
        if(item.available){
          this.barsAv.push(item);
        }
      })
      console.log(this.barsAv)
      this.loading=false;
    })
  }

  getZones(){
    this.zoneService.getZones().subscribe((res:any) => {
      this.zones = [...res.data];
      this.getBars();
    })
  }

}
