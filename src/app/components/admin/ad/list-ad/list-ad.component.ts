import { Component, OnInit } from '@angular/core';
import { advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-ad',
  templateUrl: './list-ad.component.html',
  styleUrls: ['./list-ad.component.scss']
})
export class ListAdComponent implements OnInit {
  loading=true;
  ads:advertisement[];
  adSelected:advertisement;
  sidebar: Boolean;

  constructor(private service: AdvertisementService, private route: Router) { }

  ngOnInit() {
    this.getAds();
  }


  getAds() {
    this.service.getAds().subscribe((res: any) => {
      this.ads = [...res.data];
      this.loading = false;
    });
  }

  deleteAd(id) {
    this.service.deleteAd(id).subscribe((res) => {
      this.getAds();
    });
  }

  inhabilitateAd(id) {
    this.service.getAd(id).subscribe((res: any) => {
      this.adSelected = { ...res.data };
      this.adSelected.available = false;
      this.service.updateAd(this.adSelected).subscribe((res) => {
        this.getAds();
      });
    });
  }

  habilitateAd(id) {
    this.service.getAd(id).subscribe((res: any) => {
      this.adSelected = { ...res.data };
      this.adSelected.available = true;
      this.service.updateAd(this.adSelected).subscribe((res) => {
        this.getAds();
      });
    });
  }

  editAd(id) {
    this.route.navigate(["admin/ad/edit/", id]);
  }

  create(){
    this.route.navigate(["admin/ad/add"]);
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  goBack(){
    this.route.navigate(["admin"]);
  }

}
