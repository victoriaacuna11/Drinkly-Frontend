import { Component, OnInit } from "@angular/core";
import { advertisement } from "src/app/models/advertisement";
import { AdvertisementService } from "src/app/services/advertisement.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.scss']
})
export class AddAdComponent implements OnInit {

  /**
   * file para usar el servicio de firestorage
   */
  selectedFile: File = null;
  /**
   * form que se usara para la creacion del ad
   */
  form: FormGroup;
  /**
   * imagen del advertisement
   */
  main_image: String=null;
  /**
   * Atributo que esconde y muestra el sidebar
   */
  sidebar: Boolean;
  /**
   * atributo que indica si un elemento se esta updating
   */
  updating:Boolean=false;


  constructor(
    private service: AdvertisementService,
    private _builder: FormBuilder,
    private route: Router,
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
  }

/**
 * Submit del form para crear un advertisement usanndo el servicio de los ads 
 * 
 */
  addAd() {
    
    if(this.main_image!=null){

      if(!this.form.invalid){
        this.updating=true;
      
        const ad: advertisement = {
          promo_img: this.main_image,
          client:this.form.value.client,
          _id: "",
          available: true,
        };
        this.service.createAd(ad).subscribe((res) => {
          this.route.navigate(["admin/ad"]);
        });

      }else{

        const response = alert(
          "Por favor asegurese de rellenar todos los campos antes de añadir la publicidad"
          
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
    this.route.navigate(["admin/ad"]);
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
