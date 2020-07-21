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
   * Inicializa el componente
   * 
   */
  ngOnInit() {
    /**
     * Se trae toda la información del bar y su zona
     */
    this.getBar();
  }

  /**
   * Cuenta las estrellas según el rating del bar para mostrarlo en el frontend
   * @returns {void}
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
    this.loading = false;
  }

  /**
   * Se trae el bar de detalle para mostrarlo
   * @returns {void}
   */
  getBar(){
    const id = this.routeSV.snapshot.paramMap.get('id');
    this.svc.getBar(id).subscribe( (b:any) => {
      this.bar = {...b.data};
      this.images = this.bar.pictures;
      this.getZone(this.bar.zone);
    })
  }

  /**
   * Se trae los datos de la zona a la cual pertenece el bar que está en detalle
   * @param {string} id_zone El id de la zona del bar que está en detalle
   * @returns {void}
   */
  getZone(id_zone:string):void{
    
    this.zoneService.getZone(id_zone).subscribe((res:any) => {
      this.zone={...res.data};
      this.getStars();
    })
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
   * Navega a la lista de bares
   * @returns {void} 
   */
  goBack(){
    this.route.navigate(["bars/"])
  }
  

}
