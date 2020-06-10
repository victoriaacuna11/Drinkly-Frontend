import { Component, OnInit, Input, NgZone } from "@angular/core";
import { FormGroup, FormBuilder, FormArray, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Bar } from "src/app/models/bar";
import { zone } from "src/app/models/zone";
import { ZoneService } from "src/app/services/zone.service";
import { BarService } from "src/app/services/bar.service";
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-add-bar",
  templateUrl: "./add-bar.component.html",
  styleUrls: ["./add-bar.component.scss"],
})
export class AddBarComponent implements OnInit {

  // mainImage: File = null;
  form: FormGroup;
  bar: Bar;
  zones: zone[];
  loading: Boolean = true;
  photo: String[] = ["null"];
  main_image: String = null;
  phone: String[] = [];

  constructor(
    private _builder: FormBuilder,
    private route: Router,
    private zoneService: ZoneService,
    private service: BarService,
    private storage: AngularFireStorage
  ) {
    this.form = this._builder.group({
      name: ["", Validators.required],
      working_hours: ["", Validators.required],
      rating: [
        "1",
        Validators.compose([
          Validators.max(5),
          Validators.min(1),
          Validators.required,
        ]),
      ],
      cost: [
        "1",
        Validators.compose([
          Validators.max(5),
          Validators.min(1),
          Validators.required,
        ]),
      ],
      twitter: [""],
      instagram: [""],
      facebook: [""],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      description: ["", Validators.required],
      address: ["", Validators.required],
      zone: ["", Validators.required],
      associate: false,
      phone: this._builder.array([
        this.addPhoneGroup()
      ]),
      menu: this._builder.array([
        this.addMenuGroup()
      ]),
    });
  }

  ngOnInit() {
    this.getZones();
  }

  uploadEnRes(event) {
    this.main_image = event.thumbnail;
  }

  changeImage(url) {
    return this.storage.storage
      .refFromURL(url)
      .delete()
      .then((res) => {
        this.main_image = null;
      });
  }

  uploadPhoto(event, index) {
    const newURL = event.thumbnail;
    this.photo.push(newURL);
    this.photo.splice(index, 1);
    console.log(this.photo);
  }

  deletePhoto(url, index) {
    if (this.photo.length == 1 && this.photo[0] != "null") {
      this.storage.storage
        .refFromURL(url)
        .delete()
        .then((res) => {
          this.photo[index] = "null";
          console.log(this.photo);
        });
    } else {
      if (this.photo.length == 1 && this.photo[0] == "null") {
        console.log("No se puede eliminar");
      } else {

        if (this.photo[index] != 'null') {
          this.storage.storage.refFromURL(url).delete().then(res => {
            console.log(this.photo);
          })
          this.photo.splice(index, 1);

          // if (this.photo[index] != "null") {
          //   this.storage.storage
          //     .refFromURL(url)
          //     .delete()
          //     .then((res) => {
          //       console.log(this.photo);
          //     });
          // }
          // this.photo.splice(index, 1);
        }
      }
    }
  }

  addPhoneGroup() {
    return this._builder.group({
      phone: ["", Validators.required],
    });
  }

  // addPhotoGroup() {
  //   return this._builder.group({
  //     url: [null]
  //   })
  // }

  addMenuGroup() {
    return this._builder.group({
      name: ["", Validators.required],
      price: [
        "0,00",
        Validators.compose([Validators.required, Validators.min(0.01)]),
      ],
      description: [""],
    });
  }

  get PhoneArray() {
    return <FormArray>this.form.get("phone");
  }

  get MenuArray() {
    return <FormArray>this.form.get("menu");
  }

  // get PhotoArray() {
  //   return <FormArray>this.form.get('photo');
  // }

  addPhone() {
    this.PhoneArray.push(this.addPhoneGroup());
  }

  deletePhone(index) {
    this.PhoneArray.removeAt(index);
  }

  addMenu() {
    this.MenuArray.push(this.addMenuGroup());
  }

  deleteMenu(index) {
    this.MenuArray.removeAt(index);
  }

  addPhoto() {
    this.photo.push("null");
    console.log(this.photo);
    console.log(this.photo.length);
  }

  getZones() {
    this.zoneService.getZones().subscribe((res: any) => {
      this.zones = [...res.data];
      console.log(this.zones);
      this.loading = false;
    });
  }

  createBar() {
    let photos: String[] = [];
    this.photo.forEach((item) => {
      if (item != "null") {
        photos.push(item);
      }
    });
    let phones: String[] = [];
    this.form.value.phone.forEach((item) => {
      phones.push(item.phone);
    });

    // VALIDA SI SE INTRODUJERON LAS IMÁGENES NECESARIAS (EL FORM YA ESTÁ VALIDADO).
    if (this.main_image != null && photos != null) {
      const bar: Bar = {
        _id: '',
        name: this.form.value.name,
        working_hours: this.form.value.working_hours,
        rating: Math.round(this.form.value.rating),
        cost: Math.round(this.form.value.cost),
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
        menu: this.form.value.menu,
        phone: phones,
        main_image: this.main_image,
        pictures: photos,
      };

      this.service.createBar(bar).subscribe(res => {
        this.route.navigate(["admin/bar"]);
      })
    } else {
      const response = alert(
        "Debe introducir al menos una imagen tanto en el apartado de ícono como en el de fotos"
      );
    }
  }

  goBack() {
    this.route.navigate(["admin/bar"]);
  }


}
