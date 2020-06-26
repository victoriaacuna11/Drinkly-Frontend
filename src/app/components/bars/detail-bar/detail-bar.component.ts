import { zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { BarService } from 'src/app/services/bar.service';
import { Bar } from 'src/app/models/bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-bar',
  templateUrl: './detail-bar.component.html',
  styleUrls: ['./detail-bar.component.scss']
})
export class DetailBarComponent implements OnInit {

  bar: Bar;
  zone: zone;
  images: String[];
  loading: Boolean=true;

  sidebar: Boolean;


  constructor(private svc: BarService, private route: Router, 
    private routeSV: ActivatedRoute, private zoneService: ZoneService) { }

  ngOnInit() {
    this.getBar();
  }

  getBar(){
    const id = this.routeSV.snapshot.paramMap.get('id');
    this.svc.getBar(id).subscribe( (b:any) => {
      this.bar = {...b.data};
      console.log(this.bar);
      this.images = this.bar.pictures;
      this.getZone(this.bar.zone);
    })
  }

  getZone(id_zone){
    
    this.zoneService.getZone(id_zone).subscribe((res:any) => {
      this.zone={...res.data};
      this.loading = false;
    })
  }

  getMessage($event){
    this.sidebar = $event;
  }
  

}
