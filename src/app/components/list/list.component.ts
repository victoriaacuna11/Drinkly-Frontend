import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import {Bar} from './../../models/bar';
import { ZoneService } from 'src/app/services/zone.service';
import { zone } from 'src/app/models/zone';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() barOrDrink: object[];
  @Input() zones: zone[];

  constructor(private zoneService: ZoneService, private route: Router) { }

  ngOnInit() {
    
  }

  getZone(id){
    let name = '';
    let found = false;
    let i=0;
    while(!found && i<this.zones.length){
       if(this.zones[i]._id==id){
         found = true;
         name = this.zones[i].name.toString();
       }
      i=i+1;
    }
    return name
 
   }

   detail(id){
    this.route.navigate(['bar/', id]);
  }

   
}
