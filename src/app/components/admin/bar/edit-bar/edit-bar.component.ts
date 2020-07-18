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

  /**
   * Bar que se va a edita.
   * @type {Bar}
   */
  bar: Bar= new Bar();
  /**
   * Loader (maneja si la información ya se trajo o no de la DB)
   */
  loading:Boolean=true;
  /**
   * Formulario de los datos del bar a editar.
   */
  form: FormGroup;
  /**
   * Vector que guarda los links de las fotos del bar.
   */
  pictures: String[]=[];
  /**
   * link de la imagen principal del bar.
   */
  main_image: String;
  /**
   * Vector de los teléfonos del bar.
   */
  phone: String[] = [];
  /**
   * Vector de las zonas disponibles.
   */
  zones: zone[];
  /**
   * id del bar a editar.
   */
  id: String;
  /**
   * Boolean que maneja el responsive del sidebar.
   */
  sidebar: Boolean;
  /**
   * Boolean que se encarga de informar si existe información que se está o no enviando a la DB.
   */
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

  /**
   * Se trae de la DB la información del bar que se quiere editar.
   * @param {String} id - id del bar a editar.
   * @returns {void}
   */
  getBar(id: String): void{
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

  /**
   * Se trae de la DB las zonas.
   * @returns {void}
   */
  getZones(): void{
    const id = this.routeSV.snapshot.paramMap.get('id');
    this.zoneService.getZones().subscribe((res:any) => {
      this.zones=[...res.data];
      this.getBar(id);
    })
  }

  get PhoneArray() {
    return <FormArray>this.form.get('phone');
  }

  /**
   * Le permite al usuario añadir un nuevo teléfono.
   * @returns {void}
   */
  addPhone():void {
    this.PhoneArray.push(this.addPhoneGroup());
  }

  /**
   * Crea el form group para los datos de los teléfonos del bar que tiene asociados.
   * @param {any} phone - el valor del teléfono del bar.
   * @returns {any}
   */
  addPhoneGroupWithValue(phone:any):any {
    return this._builder.group({
      phone: [phone, Validators.required]
    })
  }
  /**
   * Crea el form group para los datos del nuevo teléfono.
   * @returns {any}
   */
  addPhoneGroup():any {
    return this._builder.group({
      phone: ['', Validators.required]
    })
  }

  /**
   * Le permite al usuario eliminar uno de los teléfonos añadidos.
   * @param {number} index -index del vector de teléfonos.
   * @returns {void}
   */
  deletePhone(index): void {
    this.PhoneArray.removeAt(index);
  }

  /**
   * Crea el form group para los datos del nuevo trago del menú.
   * @returns {any}
   */
  addMenuGroup():any {
    return this._builder.group({
      name: ['', Validators.required],
      price: ['0,00', Validators.compose([Validators.required, Validators.min(0.01)])],
      description: ['']
    })
  }

  /**
   * Crea el form group con los datos de los tragos del menú.
   * @param {String} name - Nombre del trago.
   * @param {number} price - Precio del trago.
   * @param {String} description -Descripción del trago.
   * @returns {any}
   */
  addMenuGroupWithValue(name: String, price:number, description:String): any {
    return this._builder.group({
      name: [name, Validators.required],
      price: [price, Validators.compose([Validators.required, Validators.min(0.01)])],
      description: [description]
    })
  }

  get MenuArray() {
    return <FormArray>this.form.get('menu');
  }

  /**
   * Le permite al usuario añadir un nuevo trago al menú.
   * @returns {void}
   */
  addMenu():void {
    this.MenuArray.push(this.addMenuGroup());
  }

  /**
   * Le permite al usuario eliminar uno de los tragos añadidos al menú.
   * @param {number} index -index del vector de teléfonos.
   * @returns {void}
   */
  deleteMenu(index): void {
    this.MenuArray.removeAt(index);
  }

  /**
   * Elimina la iamgen de firebase y le permite al usuario subir otra.
   * @param {any} url - link de la imagen guarda en firebase.
   * @returns {any}
   */
  changeImage(url:any):any {
    return this.storage.storage.refFromURL(url).delete().then(res => {
      this.main_image = null;
    })
  }

  /**
   * Le permite al usuario añadir una foto.
   * @returns {void}
   */
  addPhoto(): void {
    this.pictures.push('null');
  }

  /**
   * Le permite al usuario eliminar una foto y cambiarla por otra.
   * @param {any} url -url de la imagen guardada.
   * @param {number} index -índice del vector que guarda las distintas fotos del bar.
   * @returns {void}
   */
  deletePhoto(url:any, index:number):void {

    if (this.pictures.length == 1 && this.pictures[0] != 'null') {
      this.storage.storage.refFromURL(url).delete().then(res => {
        this.pictures[index] = 'null';
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

  /**
   * Verifica el formulario y edita el bar en la DB.
   * @returns {void}
   */
 update():void {
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
    if (this.main_image != null && photos != null && photos.length>0) {
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

  /**
   * Navega a la lista de bares.
   * @returns {void}
   */
  goBack():void{
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

  /**
   * Le permite al usuario subir una imagen desde un archivo de su coputadora.
   * @param {any} event - evento donde el usuario selecciona la imagen.
   * @returns {void}
   */
  uploadEnRes(event:any): void {
    this.main_image = event.thumbnail;
  }

  /**
   * Le permite al usuario subir una foto para las varias que puede tener asociado el bar.
   * @param {any} event -evento donde el usuario selecciona la imagen.
   * @param {number} index -índice del vector que guarda las distintas fotos del bar.
   * @returns {void}
   */
  uploadPhoto(event:any, index:number):void {

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
