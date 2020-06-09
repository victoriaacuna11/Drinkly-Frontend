import { Component, OnInit, Input, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bar } from 'src/app/models/bar';
import { zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { BarService } from 'src/app/services/bar.service';
// import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
// import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-bar',
  templateUrl: './add-bar.component.html',
  styleUrls: ['./add-bar.component.scss']
})
export class AddBarComponent implements OnInit {

  // @Input()
  // responses: Array<any>;
  // private hasBaseDropZoneOver: boolean = false;
  // private uploader: FileUploader;
  // private title: string;


  mainImage: File = null;
  form: FormGroup;
  bar: Bar;
  zones: zone[];
  loading: Boolean = true;
  photos : File[];

  constructor(private _builder: FormBuilder, private route: Router, private zoneService: ZoneService, 
    private service: BarService, private _http: HttpClient
    // private cloudinary: Cloudinary,
    // private zone: NgZone,
    // private http: HttpClient
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
      photo: ['', Validators.required],
      main_image: ['', Validators.required],
      associate: false,
      phone: this._builder.array([
        this.addPhoneGroup()
      ]),
      menu: this._builder.array([
        this.addMenuGroup()
      ])
    });

    // this.responses = [];
    // this.title = '';

    
  }

  ngOnInit() {
    this.getZones();
    
    // const uploaderOptions: FileUploaderOptions = {
    //   url: `https://api.cloudinary.com/v1_1/dj63a52qb/image/upload`,
    //   // Upload files automatically upon addition to upload queue
    //   autoUpload: true,
    //   // Use xhrTransport in favor of iframeTransport
    //   isHTML5: true,
    //   // Calculate progress independently for each uploaded file
    //   removeAfterUpload: true,
    //   // XHR request headers
    //   headers: [
    //     {
    //       name: 'X-Requested-With',
    //       value: 'XMLHttpRequest'
    //     }
    //   ]
    // };

    // this.uploader = new FileUploader(uploaderOptions);
    // console.log(this.uploader.options);

    // this.uploader.onBuildItemForm = (fileItem: any, formdata: FormData): any => {
    //   // Add Cloudinary unsigned upload preset to the upload form
    //   formdata.append('upload_preset', 'ml_default');

    //   // Add file to upload
    //   formdata.append('file', fileItem);

    //   // Use default "withCredentials" value for CORS requests
    //   fileItem.withCredentials = false;
    //   return { fileItem, formdata };
    // };
  
  }

  // fileOverBase(e: any): void {
  //   this.hasBaseDropZoneOver = e;
  // }

  
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
      menu: this.form.value.menu,
      phone: this.form.value.phone,

      main_image: '',
      pictures: [],

    }

    // console.log(this.listaImagenes);
    // let formdata = new FormData();
    // formdata.append("photo", this.photos as any);
    // console.log(formdata);
    // console.log(this.photos);
    // this.service.createBar(this.photos).subscribe( res => {
    //   console.log('weno');
    // })


    // [disabled]="form.invalid"
  }

  selectMainImage(event) {
    this.mainImage = event.target.files[0];
  }

  selectPhotos(event) {
    this.photos = event.target.files;
  }
}



