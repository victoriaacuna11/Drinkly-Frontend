import { Component, OnInit } from '@angular/core';
import { BarService } from 'src/app/services/bar.service';
import { Bar } from 'src/app/models/bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-bar',
  templateUrl: './list-bar.component.html',
  styleUrls: ['./list-bar.component.scss']
})
export class ListBarComponent implements OnInit {
  
  /**
   * Loader (maneja si la información ya se trajo o no de la DB)
   */
  loading: Boolean = true;
  /**
   * Boolean que se encarga de informar si existe información que se está o no enviando a la DB.
   */
  updating:Boolean=false;
  /**
   * Bares que se encuentran en la DB.
   */
  bars: Bar[];
  /**
   * Boolean que maneja el responsive del sidebar.
   */
  sidebar: Boolean;

  constructor(private service: BarService, private route: Router) { }

  ngOnInit() {
    this.getBars();
  }

  /**
   * Trae los bares que se encuentran en la DB.
   * @returns {void}
   */
  getBars():void{
    this.service.getBars().subscribe((res:any) => {
      this.bars= [... res.data];
      this.loading=false;
      this.updating=false;
    })
  }

  /**
   * Muestra en pantalla si el bar es socio o no.
   * @param {Boolean} associate - boolean del bar que indica si está o no asociado.
   * @returns {String}
   */
  isAssociated(associate: Boolean):String{
    if(associate){
      return 'Socio';
    } else {
      return 'No socio';
    }
  }

  /**
   * Inhabilita/Habilita un bar.
   * @param {Bar} bar -Bar que se va a deshabilitar.
   * @returns {void}
   */
  inhabilitate(bar: Bar): void {
    this.updating=true;
    let newBar: Bar = bar;
    newBar.available=!bar.available;
    this.service.updateBar(newBar).subscribe(res => {
      this.getBars();
    })
  }

  /**
   * @ignore
   */
  delete(id){
    this.service.deleteBar(id).subscribe(res => {
      this.getBars();
    })
  }

  /**
   * Navega a la ruta donde se puede editar un bar específico.
   * @param {String} id - id del bar que se editará.
   * @returns {void}
   */
  edit(id:String): void{
    this.route.navigate(['admin/bar/edit/', id]);
  }

  /**
   * Navega a la ruta donde se puede crear un bar.
   * @returns {void}
   */
  create(): void{
    this.route.navigate(["admin/bar/add"]);
  }

  /**
   * Muestra/Oculta el sidebar
   * @param {any} $event - Evento que ocurre al hacer click para mostrar/ocultar el menú
   * @returns {void}
   */
  getMessage($event:any):void{
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
