import { Component, OnInit } from '@angular/core';
import { Bar } from 'src/app/models/bar';
import { BarService } from 'src/app/services/bar.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { item } from 'src/app/models/itemMenu';

@Component({
  selector: 'app-edit-bar',
  templateUrl: './edit-bar.component.html',
  styleUrls: ['./edit-bar.component.scss']
})
export class EditBarComponent implements OnInit {

  bar: Bar= new Bar();
  loading:Boolean=true;
  form: FormGroup;
  pictures: String[]=[];
  main_image: String;
  phone: String[] = [];
  zones: zone[];
  id: String;
  sidebar: Boolean;
  updating:Boolean=false;

  constructor(private service: BarService, private zoneService:ZoneService, private route: Router, 
    private routeSV: ActivatedRoute,private _builder: FormBuilder, private storage: AngularFireStorage,) { 
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
      associate: [true, Validators.required],
        
      });
    }

  ngOnInit() {
    this.getZones();
    
  }

  getBar(id){
    this.service.getBar(id).subscribe((res:any) => {
      
      this.bar={...res.data};
      this.id=id;
      this.bar.pictures.forEach(element => {
        this.pictures.push(element);
        
      });
      // this.pictures=this.bar.pictures;
      this.main_image=this.bar.main_image;
      if(this.pictures==null){
        this.pictures=['null']
      }
      if(this.main_image==null){
        this.main_image='null'
      }

      this.form = this._builder.group({
        name: [this.bar.name, Validators.required],
        working_hours: [this.bar.working_hours, Validators.required],
        rating: [this.bar.rating, Validators.compose([Validators.max(5), Validators.min(1), Validators.required])],
        cost: [this.bar.cost, Validators.compose([Validators.max(5), Validators.min(1), Validators.required])],
        twitter: [this.bar.twitter],
        instagram: [this.bar.instagram],
        facebook: [this.bar.facebook],
        email: [this.bar.email, Validators.compose([Validators.required, Validators.email])],
        description: [this.bar.description, Validators.required],
        address: [this.bar.address, Validators.required],
        zone: [this.bar.zone, Validators.required],
        associate: this.bar.associate,
        phone: this._builder.array([
          this.addPhoneGroup()
        ]),
        menu: this._builder.array([
          this.addMenuGroup()
        ]),
      });
      
      this.bar.phone.forEach(item => {
        this.PhoneArray.push(this.addPhoneGroupWithValue(item));
      });
      this.bar.menu.forEach(item => {

        this.MenuArray.push(this.addMenuGroupWithValue(item.name, item.price, item.description));
        console.log(item);
        console.log(item.name);
      })
      this.PhoneArray.removeAt(0);
      this.MenuArray.removeAt(0);

      this.loading=false;
    })
  }

  getZones(){
    const id = this.routeSV.snapshot.paramMap.get('id');
    this.zoneService.getZones().subscribe((res:any) => {
      this.zones=[...res.data];
      this.getBar(id);
    })
  }

  get PhoneArray() {
    return <FormArray>this.form.get('phone');
  }

  addPhone() {
    this.PhoneArray.push(this.addPhoneGroup());
  }

  addPhoneGroupWithValue(phone) {
    return this._builder.group({
      phone: [phone, Validators.required]
    })
  }

  addPhoneGroup() {
    return this._builder.group({
      phone: ['', Validators.required]
    })
  }

  deletePhone(index) {
    this.PhoneArray.removeAt(index);
  }

  addMenuGroup() {
    return this._builder.group({
      name: ['', Validators.required],
      price: ['0,00', Validators.compose([Validators.required, Validators.min(0.01)])],
      description: ['']
    })
  }

  addMenuGroupWithValue(name, price, description) {
    return this._builder.group({
      name: [name, Validators.required],
      price: [price, Validators.compose([Validators.required, Validators.min(0.01)])],
      description: [description]
    })
  }

  get MenuArray() {
    return <FormArray>this.form.get('menu');
  }

  addMenu() {
    this.MenuArray.push(this.addMenuGroup());
  }

  deleteMenu(index) {
    this.MenuArray.removeAt(index);
  }


  changeImage(url) {
    return this.storage.storage.refFromURL(url).delete().then(res => {
      this.main_image = null;
    })
  }

  addPhoto() {
    this.pictures.push('null');
    console.log(this.bar.pictures);
    // console.log(this.pictures);
    // console.log(this.pictures.length);
  }

  deletePhoto(url, index) {
    console.log('delete');
    if (this.pictures.length == 1 && this.pictures[0] != 'null') {
      console.log('1');
      this.storage.storage.refFromURL(url).delete().then(res => {
        this.pictures[index] = 'null';
        console.log(this.pictures);

      });
    } else {

      if (this.pictures.length == 1 && this.pictures[0] == 'null') {
        console.log('No se puede eliminar');
      } else {
        console.log('2');
        if (this.pictures[index] != 'null') {
          this.storage.storage.refFromURL(url).delete().then(res => {
            console.log(this.pictures);
            console.log('hi');
          })
        }
        this.pictures.splice(index, 1);
      }

    }

  }

 update() {
    let photos: String[] = [];
    this.pictures.forEach(item => {
      if (item != 'null') {
        photos.push(item);
      }
    });
    let phones: String[] = [];
    this.form.value.phone.forEach(item => {
      phones.push(item.phone);
    })

    // VALIDA SI SE INTRODUJERON LAS IMÁGENES NECESARIAS (EL FORM YA ESTÁ VALIDADO).
    if (this.main_image != null && photos != null) {
      this.updating=true;
      const sm = {
        insta: this.form.value.instagram,
        twitter: this.form.value.twitter,
        facebook: this.form.value.facebook,
        email: this.form.value.email
      }

      const loc = {
        zone: this.form.value.zone,
        address: this.form.value.address,
      }

      const bar = {
        _id: this.id,
        name: this.form.value.name,
        working_hours: this.form.value.working_hours,
        rating: Math.round(this.form.value.rating),
        cost: Math.round(this.form.value.cost),
        social_media: sm,
        description: this.form.value.description,
        location: loc,
        available: this.bar.available,
        views: this.bar.views,
        associate: this.form.value.associate,
        menu: this.form.value.menu,
        phone: phones,
        main_image: this.main_image,
        pictures: photos,
      }

      this.service.updateBar(bar).subscribe(res => {
        this.route.navigate(["admin/bar"]);
      })
    } else {
      const response = alert('Debe introducir al menos una imagen tanto en el apartado de ícono como en el de fotos');
    }
  }

  goBack(){
    console.log(this.pictures);
    console.log(this.bar.pictures);
    
    
    if(this.main_image==null || this.main_image!=this.bar.main_image){
      const response = alert(
        "Ya borró la ícono anterior. Por favor, tiene que subir uno y guardar el cambio."
      );
    } else {
      if(this.pictures==null || this.bar.pictures==null){
        const response = alert(
          "Ya borró algunas de las imágenes anteriores. Por favor, tiene que subir unas y guardar el cambio."
        );
      } else {
        let canGoBack = true;
        if(this.bar.pictures.length==this.pictures.length){
          for (let i = 0; i < this.bar.pictures.length; i++) {
            if(this.bar.pictures[i]!=this.pictures[i]){
              canGoBack=false;
            }    
          }
        } else {
          canGoBack=false;
        }
        if(canGoBack){
          this.route.navigate(['admin/bar']);
        } else {
          const response = alert(
            "Ya borró algunas de las imágenes anteriores o agregó nuevas. Por favor, no podemos volver atrás sin que guardae el cambio."
          );
        }
      }
    }
    
  }

  uploadEnRes(event) {
    this.main_image = event.thumbnail;
  }

  uploadPhoto(event, index) {

    const newURL = event.thumbnail;
    this.pictures.push(newURL);
    this.pictures.splice(index, 1);
    console.log(this.bar.pictures);

    ;
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
}
