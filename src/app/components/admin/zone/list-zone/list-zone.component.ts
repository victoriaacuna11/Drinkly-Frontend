import { Component, OnInit } from '@angular/core';
import { zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-zone',
  templateUrl: './list-zone.component.html',
  styleUrls: ['./list-zone.component.scss']
})
export class ListZoneComponent implements OnInit {
  /**
   * Lista de las zonas que están en la DB
   */
  zones: zone[];
  /**
   * Loader (indica si la data ya se trajo o no de la DB)
   * @type {Boolean}
   * @default {true}
   */
  loading:Boolean=true;
  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar: Boolean;
  /**
   * Boolean que se encarga de informar si existe información que se está o no enviando a la DB.
   */
  updating:Boolean=false;

  constructor(
    private service: ZoneService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.getZones();
  }

  /**
   * Se trae las zonas de la DB
   * @returns {void}
   */
  getZones():void{
    this.service.getZones().subscribe((res:any) => {
      this.zones=[...res.data];
      this.loading=false;
      this.updating=false;
    })
  }

  /**
   * @ignore
   */
  delete(id:String):void {
    this.service.deleteZone(id).subscribe((res) => {
      this.getZones();
    });
  }
  /** 
   * Habilita/Deshabilita una zona
   * @param {zone} zone - zona a deshabilitar/habilitar.
   * @returns {void} 
   */
  inhabilitate(zone:zone):void {
    this.updating=true;
    let newZone = zone;
    newZone.available=!zone.available;
    this.service.updateZone(newZone).subscribe(res => {
      this.getZones();
    })
  }

  /**
   * Navega a la ruta donde se puede editar una zona específica.
   * @param {String} id - id de la zona que se editará.
   * @returns {void}
   */
  edit(id:String):void {
    this.route.navigate(["admin/zone/edit/", id]);
  }

  /**
   * Navega a la ruta donde se puede crear una zona.
   * @returns {void}
   */
  create():void{
    this.route.navigate(["admin/zone/add"]);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  /**
   * Navega al home de admin.
   * @returns {void}
   */
  goBack():void{
    this.route.navigate(["admin"]);
  }

}
