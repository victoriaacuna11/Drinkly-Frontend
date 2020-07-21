import { Component, OnInit } from '@angular/core';
import { zone } from 'src/app/models/zone';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ZoneService } from 'src/app/services/zone.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.scss']
})
export class EditZoneComponent implements OnInit {

  /**
   * Loader (indica si la data ya se trajo o no de la DB)
   * @type {Boolean}
   * @default {true}
   */
  loading: Boolean = true;
  /**
   * Zona que se va a editar.
   */
  zone: zone;
  /** Formulario para la edición de la zona.
   * @type {FormGroup}
   */
  form: FormGroup;
  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar: Boolean;
  /**
   * Indica si se está enviando la información a la DB para editar la zona.
   * @type {Boolean}
   */
  updating:Boolean=false;

  constructor(
    private service: ZoneService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
  ) { 
    this.form = this._builder.group({
      name: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getZone();
  }

  /**
   * Se trae los datos de la zona a editar de la DB
   * @returns {void}
   */
  getZone():void{
    const id = this.routeSV.snapshot.paramMap.get("id");
    this.service.getZone(id).subscribe( (res:any) => {
      this.zone = {...res.data};
      this.form = this._builder.group({
        name: [this.zone.name, Validators.required]
      });
      this.loading=false;
    })
  }

  /**
   * Verifica el formulario y edita la zona en la DB.
   * @returns {void}
   */
  edit():void{

    this.updating=true;
    var zone: zone = {
      name: this.form.value.name,
      _id: this.zone._id,
      available: this.zone.available,
    };
    this.service.updateZone(zone).subscribe((res) => {
      this.route.navigate(["admin/zone"]);
    });
    
  }
  /**
   * Navega a la lista de zonas.
   * @returns {void}
   */
  goBack():void {
    this.route.navigate(["admin/zone"]);
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

}
