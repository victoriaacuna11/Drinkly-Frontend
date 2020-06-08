import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
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

  constructor(private _builder: FormBuilder, private route: Router, private zoneService: ZoneService
    ) {
    this.form = this._builder.group({
      name: ['', Validators.required],
      working_hours: ['', Validators.required],
      rating: ['1', Validators.compose([Validators.max(5), Validators.min(1), Validators.required])],
      cost: ['1', Validators.compose([Validators.max(5), Validators.min(1), Validators.required])],
      twitter: [''],
      instagram: [''],
      facebook: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      description: ['', Validators.required],
      address: ['', Validators.required],
      zone: ['', Validators.required],
      photo: [''],
      main_image: [''],
      associate: [''],
      phone: this._builder.array([
        this.addPhoneGroup()
      ]),
      menu: this._builder.array([
        this.addMenuGroup()
      ])
    })
  }

  ngOnInit() {
    this.getZones();
  }



  addPhoneGroup() {
    return this._builder.group({
      phone: ['', Validators.required]
    })
  }

  addMenuGroup(){
    return this._builder.group({
      name: ['', Validators.required],
      price: ['0,00', Validators.compose([Validators.required, Validators.min(0.01)])],
      description: ['']
    })
  }

  get PhoneArray(){
    return <FormArray>this.form.get('phone');
  }

  get MenuArray(){
    return <FormArray>this.form.get('menu');
  }


  addPhone(){
    this.PhoneArray.push(this.addPhoneGroup());
  }

  deletePhone(index){
    this.PhoneArray.removeAt(index);
  }

  addMenu(){
    this.MenuArray.push(this.addMenuGroup());
  }

  deleteMenu(index){
    this.MenuArray.removeAt(index);
  }


  getZones() {
    this.zoneService.getZones().subscribe((res: any) => {
      this.zones = [...res.data];
      console.log(this.zones);
      this.loading = false;
    })
  }

  createBar() {
    

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

  findValidPhones(){
    let validPhones = [];
    let phones = this.form.value.phone;
    phones.forEach(number => {
      if(number!=""){
        validPhones.push(number);
      }
    });
    console.log(phones);
    console.log(validPhones);
  }

  selectMainImage(event) {
    this.mainImage = event.target.files[0];
  }
}
