import { Component, OnInit } from '@angular/core';
import { Bar } from 'src/app/models/bar';
import { BarService } from 'src/app/services/bar.service';
import { ZoneService } from 'src/app/services/zone.service';
import { zone } from 'src/app/models/zone';

@Component({
  selector: 'app-bars-list',
  templateUrl: './bars-list.component.html',
  styleUrls: ['./bars-list.component.scss']
})
export class BarsListComponent implements OnInit {

  bars: Bar[];
  loading: Boolean=true;
  zones:zone[];
  

  constructor(private service: BarService, private zoneService: ZoneService) { }

  ngOnInit() {
    this.getZones();
  }

  getBars(){
    this.service.getBars().subscribe((res:any) => {
      this.bars=[...res.data];
      this.loading=false;
      
    })
  }

  getZones(){
    this.zoneService.getZones().subscribe((res:any) => {
      this.zones = [...res.data];
      this.getBars();
    })
  }
  

}
