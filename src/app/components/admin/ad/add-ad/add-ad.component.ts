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

  selectedFile: File = null;
  form: FormGroup;
  main_image: String=null;
  sidebar: Boolean;


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

  ngOnInit() {
  }
  
  addAd() {
    if(this.main_image!=null){

      if(!this.form.invalid){

      
        const ad: advertisement = {
          promo_img: this.main_image,
          client:this.form.value.client,
          _id: "",
          available: true,
        };
        console.log(ad);
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
