import { Component, OnInit } from '@angular/core';
import { Bar } from 'src/app/models/bar';
import { BarService } from 'src/app/services/bar.service';
import { ZoneService } from 'src/app/services/zone.service';
import { zone } from 'src/app/models/zone';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-bars-list',
  templateUrl: './bars-list.component.html',
  styleUrls: ['./bars-list.component.scss']
})
export class BarsListComponent implements OnInit {

  bars: Bar[];
  loading: Boolean=true;
  zones:zone[];
  sidebar: Boolean;
  barsAv: Bar[] =[];
  defaultFilt = true;
  stars=[];
  filterPost: string = "qlqsa";


  constructor(private service: BarService, private zoneService: ZoneService, private route: Router,
     private data: SharedService) { }
/**
 * 
 * Inicializa el componente
 */
  ngOnInit() {
    this.data.currentMsg.subscribe(m => this.filterPost = m)
    this.getZones();
    
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

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  getBars(){
    this.service.getBars().subscribe((res:any) => {
      this.bars=[...res.data];
      
      this.bars.forEach(item => {
        if(item.available){
          this.barsAv.push(item);
        }
      })
      console.log(this.barsAv)
      this.getStars()
      this.loading=false;
    })
  }

  getZones(){
    this.zoneService.getZones().subscribe((res:any) => {
      this.zones = [...res.data];
      this.getBars();
    })
  }

  receiveFilt($event){
    console.log("en la lista: " + $event)
    if($event==="zonas"){
      this.defaultFilt = true;
    }else 
      this.defaultFilt = false;
  }

  goBack(){
    //vete a home
    this.route.navigate([""])
  }
/**
 * Añade las estrellas a los cards de los bares
 * 
 */
  getStars(){
    let aux_stars=[]

    this.barsAv.forEach(i=>{
      let a
      let rate=i.rating
      let aux;
      aux_stars=[]
      
      for(a=0 ; a<5 ; a++){
        if(rate!=0){
          aux = true
          aux_stars.push(aux)
        }else{
          aux = false 
          aux_stars.push(aux)
        }
        if(rate!=0){
          rate=rate-1
        }
        
      }
      
      this.stars.push(aux_stars)
      
    })
    console.log(this.stars)
    
  }
  
  

}
