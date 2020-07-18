import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {

  /** Formulario para la creación de la zona.
   * @type {FormGroup}
   */
  form: FormGroup;
  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar: Boolean;
  /**
   * Indica si se está enviando la información a la DB para crear la zona.
   * @type {Boolean}
   */
  updating:Boolean=false;

  constructor(
    private _builder: FormBuilder,
    private route: Router,
    private service: ZoneService,
    ) { 
      this.form = this._builder.group({
        name: ["", Validators.required],
      });
    }

  ngOnInit() {
  }

  /**
   * Verifica el form y crea la zona en la DB.
   * @returns {void}
   */
  add():void {
    this.updating=true;
    const zone: zone = {
      name: this.form.value.name,
      available: true,
      _id: ""
    };
    console.log(zone);
    this.service.postZone(zone).subscribe((res) => {
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

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
}
