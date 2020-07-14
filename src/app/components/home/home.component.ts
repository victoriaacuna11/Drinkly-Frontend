import { Component, OnInit, HostListener } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';
import { Router } from '@angular/router';
import { drink } from 'src/app/models/drink';
import { Bar } from 'src/app/models/bar';
import { BarService } from 'src/app/services/bar.service';
import { ZoneService } from 'src/app/services/zone.service';
import { zone } from 'src/app/models/zone';
import { advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bars: Bar[];
  zones:zone[];
  barsAv: Bar[]=[];
  showBars: Bar[]=[];
  stars: Boolean[]=[];
  drinks: drink[]=[];
  drinksA: drink[] =[];  
  showDrinks: drink[]=[];
  ads: advertisement[]=[];
  adsA: advertisement[]=[];
  eleg: number[];
  loading: Boolean = true;
  sidebar: Boolean;
  aux;
  filterPost: string = "qlqsa";

  constructor(private service: DrinkService, private route: Router, private serviceB: BarService, private zoneService: ZoneService,
              private serviceAd: AdvertisementService) { }

  ngOnInit() {
    this.getDrinks();
    this.getZones();
    this.getAdvertisements();
  }

  @HostListener('window:scroll', [])
onWindowScroll() {
    const scrollOffset = window.pageYOffset;

    let header = document.getElementById("navbar");
    let lema = document.getElementById("lema");

    var height = Math.max( 50 , 280 - window.scrollY ) 
    header.style.height = height + 'px';
    if ( height >= 20 ) {
      document.getElementById("logo").style.paddingLeft = "0";
    } else { 
      document.getElementById("logo").style.paddingLeft = "5rem";
    }
    height = (height - 50)/230;
    lema.style.color = "rgba(255,255,255,"+height+")";

    
}

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    } 
  }

  getStars(bar: Bar){
    this.stars.length = 0;
    var i;
    var aux: boolean;
    for(i=0 ; i<5 ; i++){
      if(i<bar.rating){
        aux = true
        this.stars.push(aux)
      }else{
        aux = false 
        this.stars.push(aux)
      }
    }
  }

  getAdvertisements() {
    this.serviceAd.getAds().subscribe((res:any) => {
      console.log(this.ads);
      this.ads = [...res.data]
      
      this.ads.forEach(i => {
        if(i.available){
          this.adsA.push(i);
        }
      })
      this.loading = false;
    })
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
      this.elegir(this.drinksA, this.showDrinks)
      // this.loading = false;
    })
  }

  elegir(vector = [], aux = []) {
    var num;
    for (var i = 0; i < 3; i++) {
      num = Math.floor(Math.random() * vector.length)
      var rand = vector[num];
      aux.push(rand);
      vector.splice(num,1)
    }
    console.log(aux)
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

  detailBar(id){
    this.route.navigate(['bar/', id]);
  }

  detailDrink(id){
    this.route.navigate(['drink/', id]);
  }

  addDrink(){
    this.route.navigate(['post-drink/']);
  }

  addAdvertisement(){
    this.route.navigate(["post-your-business"]);
  }

  home(){
    this.route.navigate([""]);
  }

  getBars(){
    this.serviceB.getBars().subscribe((res:any) => {
      this.bars=[...res.data];
      
      this.bars.forEach(item => {
        if(item.available){
          this.barsAv.push(item);
        }
      })
      this.elegir(this.barsAv, this.showBars)
      console.log(this.barsAv)
      // this.loading=false;
    })
  }


  getZones(){
    this.zoneService.getZones().subscribe((res:any) => {
      this.zones = [...res.data];
      this.getBars();
    })
  }

}
