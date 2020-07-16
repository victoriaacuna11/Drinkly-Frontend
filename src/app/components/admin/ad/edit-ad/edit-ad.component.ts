import { Component, OnInit } from "@angular/core";
import { advertisement } from "src/app/models/advertisement";
import { AdvertisementService } from "src/app/services/advertisement.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.component.html',
  styleUrls: ['./edit-ad.component.scss']
})
export class EditAdComponent implements OnInit {
  loading: Boolean = true;
  ad: advertisement;
  form: FormGroup;
  main_image: String;
  sidebar: Boolean;
  updating:Boolean=false;

  constructor(
    private service: AdvertisementService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private storage: AngularFireStorage
  ) { 
    this.form = this._builder.group({
      client: ["", Validators.required],
    });
  }
/**
 * Inicializa el componente 
 * 
 */
  ngOnInit() {
    this.getAd();
  }

/**
 * Trae el advertisement de la base de datos para editarlo 
 * 
 */
  getAd() {
    const id = this.routeSV.snapshot.paramMap.get("id");
    this.service.getAd(id).subscribe((res: any) => {
      this.ad = { ...res.data };
      this.main_image=this.ad.promo_img;
      this.form = this._builder.group({
        client: [this.ad.client, Validators.required],
      });
      this.loading = false;
    });
  }

  // onSelectedFile(event) {
  //   this.selectedFile = event.target.files[0];
  // }

/**
 * Hace submit al form y usa el servicio para editar el advertisement en la base de datos 
 * 
 */
  editAd() {
    
    var adver: advertisement = {
      client: this.form.value.client,
      promo_img: this.main_image,
      _id: this.ad._id,
      available: true,
    };
    console.log(adver);
    console.log(this.ad.promo_img);

    if (this.main_image != null) {
      if(!this.form.invalid){
        this.updating=true;
        console.log(adver);
        this.service.updateAd(adver).subscribe((res) => {
          this.route.navigate(["admin/ad"]);
        });
      }else{

        const response = alert(
          "No puede dejar campos vacíos al editar una publicidad. Por favor, revise"
        );
      }
        

    } else {
      const response = alert(
        "No ha subido ninguna imagen. Por favor, suba una."
      );
    }
  }
/**
 * Navega a la vista anterior 
 * 
 */
  goBack() {
    if(this.main_image==null || this.main_image!=this.ad.promo_img){
      const response = alert(
        "Ya borró la imagen. Por favor, tiene que subir una y guardar el cambio."
      );
    } else {
      this.route.navigate(["admin/ad"]);
    }
    
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

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

}
