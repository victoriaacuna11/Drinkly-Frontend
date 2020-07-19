import { Component, OnInit } from '@angular/core';
import { advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ad',
  templateUrl: './list-ad.component.html',
  styleUrls: ['./list-ad.component.scss']
})
export class ListAdComponent implements OnInit {
  /**
   * atributo que indica si se han cargado los datos traidos de la base de datos
   */
  loading=true;
  /**
   *  lista de advertisements traidas de la base de datps
   */
  ads:advertisement[];
  /**
   * atributo que nos indica que ad se esta updating
   */
  adSelected:advertisement;
  /**
   * Atributo que esconde y muestra el sidebar
   */
  sidebar: Boolean;
  /**
   * atributo que indica si un elemento se esta updating
   */
  updating:Boolean=false;

  constructor(private service: AdvertisementService, private route: Router) { }

/**
 * Inicializa el componente 
 * 
 */
  ngOnInit() {
    this.getAds();
  }

/**
 * 
 * Trae los advertisements de la base de datos
 * 
 */
  getAds() {
    this.service.getAds().subscribe((res: any) => {
      this.ads = [...res.data];
      this.loading = false;
      this.updating=false;
    });
  }

/**
 * 
 * @ignore
 * 
 */
  deleteAd(id) {
    this.service.deleteAd(id).subscribe((res) => {
      this.getAds();
    });
  }

/**
 * 
 * Inhabilida e advertisement en la base de datos poniendo la propiedad de available en falso
 * @param {string} id id del trago que se inhabilita
 */

  inhabilitateAd(id) {
    this.updating=true;
    this.service.getAd(id).subscribe((res: any) => {
      this.adSelected = { ...res.data };
      this.adSelected.available = false;
      this.service.updateAd(this.adSelected).subscribe((res) => {
        this.getAds();
      });
    });
  }

/**
 * 
 * Habilita e advertisement en la base de datos poniendo la propiedad de available en verdader
 * @param {string} id id del trago que se habilita
 */
  habilitateAd(id) {
    this.updating=true;
    this.service.getAd(id).subscribe((res: any) => {
      this.adSelected = { ...res.data };
      this.adSelected.available = true;
      this.service.updateAd(this.adSelected).subscribe((res) => {
        this.getAds();
      });
    });
  }

/**
 * 
 * Navega a la vista de editar advertisement
 * @param {string} id id del trago que se quiere editar
 */
  editAd(id) {
    this.route.navigate(["admin/ad/edit/", id]);
  }

/**
 * 
 * Navega a la vista de crear advertisement
 * 
 */
  create(){
    this.route.navigate(["admin/ad/add"]);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

/**
 * 
 * Navega a la vista de lista de todas las schemas de la base de datos
 * 
 */
  goBack(){
    this.route.navigate(["admin"]);
  }

}
