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

  /**
   * Regresa el nombre de la zona del bar
   * @param {string} id El id de cada bar en el ngFor
   * @returns {string} La zona
   */
  getZone(id:string):string{
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

   /**
    * Navega a la ruta de bar detallado, llevándose el id del mismo
    * @param {string} id el id del bar clickeado
    * @returns {void}
    */
   detail(id:string):void{
    this.route.navigate(['bar/', id]);
  }

  /**
   * Setea el atributo local que mueve el contenido cuando sale el sidebar
   * @param {any} $event El evento que es pasado cuando el ícono del sidebar es clickeado
   * @returns {void} 
   */
  getMessage($event:any):void{
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  /**
   * Trae los bares de la base de datos para mostrarlos en la lista
   * @returns {void}
   */
  getBars(){
    this.service.getBars().subscribe((res:any) => {
      this.bars=[...res.data];
      
      this.bars.forEach(item => {
        if(item.available){
          this.barsAv.push(item);
        }
      })
      this.getStars()
      this.loading=false;
    })
  }

    /**
   * Trae las zonas de la base de datos para mostrarlas en la lista
   * @returns {void}
   */
  getZones(){
    this.zoneService.getZones().subscribe((res:any) => {
      this.zones = [...res.data];
      this.getBars();
    })
  }

  /**
   * Muestra las opciones para filtrar por zona o por nombre dependiendo del evento del botón
   * @param {any} $event El evento que es pasado cuando el botón de "filtrar por" es clickeado
   * @returns {void}   
   */
  receiveFilt($event:any):void{
    //console.log("en la lista: " + $event)
    if($event==="zonas"){
      this.defaultFilt = true;
    }else 
      this.defaultFilt = false;
  }

  /**
   * Navega al home
   * @returns {void}
   */
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
    
  }
  
  

}
