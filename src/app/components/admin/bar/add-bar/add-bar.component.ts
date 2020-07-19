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

  /** Formulario para la creación del bar.
   * @type {FormGroup}
   */
  form: FormGroup;
  /**
   * Bar que se va a crear.
   * @type {Bar}
   */
  bar: Bar;
  /**
   * Zonas disponibles.
   * @type {zone}
   */
  zones: zone[];
  /**
   * Loader (indica si la data ya se trajo o no de la DB)
   * @type {Boolean}
   * @default {true}
   */
  loading: Boolean = true;
  /**
   * Vector de las fotos del bar.
   * @type  {String[]}
   * @default {["null"]}
   */
  photo: String[] = ["null"];
  /**
   * Guarda la imagen principal del bar.
   * @type {String}
   * @default {null}
   */
  main_image: String = null;
  /**
   * Guarda los teléfonos del bar que serán enviados.
   * @type {String[]}
   * @default {[]}
   */
  phone: String[] = [];
  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar: Boolean;
  /**
   * Indica si se está enviando la información a la DB para crear el bar.
   * @type {Boolean}
   */
  updating:Boolean=false;

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

  /**
   * Le permite al usuario subir una imagen desde un archivo de su coputadora.
   * @param {any} event - evento donde el usuario selecciona la imagen.
   * @returns {void}
   */
  uploadEnRes(event:any) : void {
    this.main_image = event.thumbnail;
  }

  /**
   * Elimina la iamgen de firebase y le permite al usuario subir otra.
   * @param {any} url - link de la imagen guarda en firebase.
   * @returns {any}
   */
  changeImage(url:any): any {
    return this.storage.storage
      .refFromURL(url)
      .delete()
      .then((res) => {
        this.main_image = null;
      });
  }

  /**
   * Le permite al usuario subir una foto para las varias que puede tener asociado el bar.
   * @param {any} event -evento donde el usuario selecciona la imagen.
   * @param {number} index -índice del vector que guarda las distintas fotos del bar.
   * @returns {void}
   */
  uploadPhoto(event:any, index:number): void {
    const newURL = event.thumbnail;
    this.photo.push(newURL);
    this.photo.splice(index, 1);
    console.log(this.photo);
  }

  /**
   * Le permite al usuario eliminar una foto y cambiarla por otra.
   * @param {any} url -url de la imagen guardada.
   * @param {number} index -índice del vector que guarda las distintas fotos del bar.
   * @returns {void}
   */
  deletePhoto(url:any, index:number): void {
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
          
        }
        this.photo.splice(index, 1);
      }
    }
  }

  /**
   * Crea el form group para los datos del nuevo teléfono.
   * @returns {any}
   */
  addPhoneGroup(): any {
    return this._builder.group({
      phone: ["", Validators.required],
    });
  }

  /**
   * Crea el form group para los datos del nuevo trago del menú.
   * @returns {any}
   */
  addMenuGroup(): any {
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

  
  /**
   * Le permite al usuario añadir un nuevo teléfono.
   * @returns {void}
   */
  addPhone(): void {
    this.PhoneArray.push(this.addPhoneGroup());
  }

  /**
   * Le permite al usuario eliminar uno de los teléfonos añadidos.
   * @param {number} index -index del vector de teléfonos.
   * @returns {void}
   */
  deletePhone(index:number):void {
    this.PhoneArray.removeAt(index);
  }

  /**
   * Le permite al usuario añadir un nuevo trago al menú.
   * @returns {void}
   */
  addMenu(): void {
    this.MenuArray.push(this.addMenuGroup());
  }

  /**
   * Le permite al usuario eliminar uno de los tragos añadidos al menú.
   * @param {number} index -index del vector de teléfonos.
   * @returns {void}
   */
  deleteMenu(index):void {
    this.MenuArray.removeAt(index);
  }

  /**
   * Le permite al usuario añadir una foto.
   * @returns {void}
   */
  addPhoto():void {
    this.photo.push("null");
  }

  /**
   * Trae las zonas de la DB.
   * @returns {void}
   */
  getZones(): void {
    this.zoneService.getZones().subscribe((res: any) => {
      this.zones = [...res.data];
      console.log(this.zones);
      this.loading = false;
    });
  }

  /**
   * Verifica el formulario y crea el bar en la DB.
   * @returns {void}
   */
  createBar():void {
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
    if (this.main_image != null && photos != null && photos.length>0) {
      this.updating=true;
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

  /**
   * Navega a la lista de bares.
   * @returns {void}
   */
  goBack(): void {
    this.route.navigate(["admin/bar"]);
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
