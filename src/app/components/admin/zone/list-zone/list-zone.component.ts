import { Component, OnInit } from '@angular/core';
import { zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-zone',
  templateUrl: './list-zone.component.html',
  styleUrls: ['./list-zone.component.scss']
})
export class ListZoneComponent implements OnInit {
  zones: zone[];
  loading:Boolean=true;
  sidebar: Boolean;
  updating:Boolean=false;
  constructor(
    private service: ZoneService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.getZones();
  }

  getZones(){
    this.service.getZones().subscribe((res:any) => {
      this.zones=[...res.data];
      this.loading=false;
      this.updating=false;
    })
  }

  delete(id) {
    this.service.deleteZone(id).subscribe((res) => {
      this.getZones();
    });
  }

  inhabilitate(zone:zone) {
    this.updating=true;
    let newZone = zone;
    newZone.available=!zone.available;
    this.service.updateZone(newZone).subscribe(res => {
      this.getZones();
    })
  }


  edit(id) {
    this.route.navigate(["admin/zone/edit/", id]);
  }

  create(){
    this.route.navigate(["admin/zone/add"]);
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
