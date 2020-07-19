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

  /**
   * Inicializa el componente
   */
  ngOnInit() {
    this.getDrinks();
    this.getZones();
    this.getAdvertisements();
  }

  @HostListener('window:scroll', [])
  /**
   * Cuando el usuario hace scroll, lo detecta y cambia el tamaño del navbar en conjunto con su contenido
   * @returns {void}
   */
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

  /**
   * Setea el atributo local que mueve el contenido cuando sale el sidebar
   * @param {any} $event El evento que es pasado cuando el ícono del sidebar es clickeado
   * @returns {void} 
   */
  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    } 
  }

  /**
   * Obtiene el rating del bar que se quiere mostrar en la ficha y se guarda en un vector de
   * booleas para luego usar este para mostrar iconos de estrellas segun la cantidad de rating
   * @param {Bar} bar Se pasa el Bar que se esta mostrando en la ficha de bares
   * @returns {void} 
   */
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

  /**
   * Se trae los advertisements de la base de datos para lego mostrarlos
   * @returns {void}
   */
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
  
  /**
   * Trae las bebidas disponibles de la base de datos y los incluye en la variable drinksA
   * luego llama a elegir los drinks que se van mostrar
   * @returns {void}
   */
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

  /**
   * Elige entre los elementos de un vector las 3 opciones que se mostraran en su seccion (bares o trahos)
   * @param {any[]} vector Se pasa bares o bebidas disponibles
   * @param {any[]} aux se pasa el array para guardar los bares o bebidas seleccionadas
   * @returns {void} 
   */
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

  /**
   * Obtiene el nombre de la zona del bar que se quiere mostrar
   * @param {any} id Se pasa el id de la zona del bar que se quiere mostrar
   * @returns {string} nombre de la zona 
   */
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

  /**
   * Te dirige al detalle del bar seleccionado
   * @param {any} id Se pasa el id del bar que se quiere ver detalle
   * @returns {void}
   */
  detailBar(id){
    this.route.navigate(['bar/', id]);
  }

  /**
   * Te dirige al detalle del trago seleccionado
   * @param {any} id Se pasa el id del trago que se quiere ver detalle
   * @returns {void}
   */
  detailDrink(id){
    this.route.navigate(['drink/', id]);
  }

  /**
   * Te dirige a la seccion para enviar la receta de un trago
   * @returns {void}
   */
  addDrink(){
    this.route.navigate(['post-drink/']);
  }

  /**
   * Te dirige a la seccion para enviar tu bar a drinkly
   * @returns {void}
   */
  addAdvertisement(){
    this.route.navigate(["post-your-business"]);
  }

  /**
   * Te dirige al home
   * @returns {void}
   */
  home(){
    this.route.navigate([""]);
  }

  /**
   * Trae los bares disponibles de la base de datos y los incluye en la variable barsA
   * luego llama a elegir los bares que se van mostrar
   * @returns {void}
   */
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

  /**
   * Trae las zonas disponibles de la base de datos
   * @returns {void}
   */
  getZones(){
    this.zoneService.getZones().subscribe((res:any) => {
      this.zones = [...res.data];
      this.getBars();
    })
  }

}
