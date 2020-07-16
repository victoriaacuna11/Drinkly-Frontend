import { zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BarService } from 'src/app/services/bar.service';
import { Bar } from 'src/app/models/bar';
import { Component, OnInit } from '@angular/core';
import { CommentStmt } from '@angular/compiler';

@Component({
  selector: 'app-detail-bar',
  templateUrl: './detail-bar.component.html',
  styleUrls: ['./detail-bar.component.scss']
})
export class DetailBarComponent implements OnInit {

  bar: Bar;
  zone: zone;
  images: String[];
  loading: Boolean=true;
  stars: Boolean[]=[];

  sidebar: Boolean;


  constructor(private svc: BarService, private route: Router, 
    private routeSV: ActivatedRoute, private zoneService: ZoneService) { }
/**
 * 
 * Inicializa el componente
 */
  ngOnInit() {
    this.getBar();
  }
/**
 * Añade al array de las stars la cantidad de estrellas que tiene en manera de booleanos
 * 
 */
  getStars(){
    var i;
    var aux: boolean;
    for(i=0 ; i<5 ; i++){
      if(i<this.bar.rating){
        aux = true
        this.stars.push(aux)
      }else{
        aux = false 
        this.stars.push(aux)
      }
    }
    console.log(this.stars)
    this.loading = false;
  }
/**
 * Trae el bar de la base de datos
 * 
 */
  getBar(){
    const id = this.routeSV.snapshot.paramMap.get('id');
    this.svc.getBar(id).subscribe( (b:any) => {
      this.bar = {...b.data};
      console.log(this.bar);
      this.images = this.bar.pictures;
      this.getZone(this.bar.zone);
    })
  }
/**
 * Trae la zona en la cual esta el bar
 * @param {string} id_zone id de la zona del bar
 */
  getZone(id_zone){
    
    this.zoneService.getZone(id_zone).subscribe((res:any) => {
      this.zone={...res.data};
      this.getStars();
    })
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
/**
 * Regresa a la vista anterior
 * 
 */
  goBack(){
    this.route.navigate(["bars/"])
  }
  

}
