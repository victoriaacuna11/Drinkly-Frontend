import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Bar } from 'src/app/models/bar';
import { zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { item } from 'src/app/models/itemMenu';

@Component({
  selector: 'app-add-bar',
  templateUrl: './add-bar.component.html',
  styleUrls: ['./add-bar.component.scss']
})
export class AddBarComponent implements OnInit {

  mainImage: File = null;
  form: FormGroup;
  bar: Bar;
  zones: zone[];
  loading: Boolean = true;

  constructor(private _builder: FormBuilder, private route: Router, private zoneService: ZoneService) {
    this.form = this._builder.group({
      name: [''],
      working_hours: [''],
      rating: 1,
      cost: 1,
      twitter: [''],
      instagram: [''],
      facebook: [''],
      email: [''],
      description: [''],
      address: [''],
      zone: [''],
      category: [''],
      photo: [''],
      main_image: [''],
      associate: [''],
      phone: this._builder.array([
        this.addPhoneGroup()
      ])
    })
  }

  ngOnInit() {
    this.getZones();
  }

  addPhoneGroup() {
    return this._builder.group({
      phone: ['']
    })
  }


  getZones() {
    this.zoneService.getZones().subscribe((res: any) => {
      this.zones = [...res.data];
      console.log(this.zones);
      this.loading = false;
    })
  }

  createBar() {
    console.log(this.form.value.associate);

    const bar: Bar = {
      name: this.form.value.name,
      working_hours: this.form.value.working_hours,
      rating: this.form.value.rating,
      cost: this.form.value.cost,
      twitter: this.form.value.twitter,
      instagram: this.form.value.instagram,
      facebook: this.form.value.facebook,
      email: this.form.value.email,
      description: this.form.value.description,
      zone: this.form.value.zone,
      address: this.form.value.address,
      available: true,
      views: 0,

      associate: this.form.value.associate,
      main_image: '',
      pictures: [],
      phone: [],
      menu: [],

    }
    console.log(bar);
  }


  selectMainImage(event) {
    this.mainImage = event.target.files[0];
  }
}
