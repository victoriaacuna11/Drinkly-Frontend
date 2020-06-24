import { Component, OnInit } from '@angular/core';
import { zone } from 'src/app/models/zone';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ZoneService } from 'src/app/services/zone.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-zone',
  templateUrl: './edit-zone.component.html',
  styleUrls: ['./edit-zone.component.scss']
})
export class EditZoneComponent implements OnInit {

  loading: Boolean = true;
  zone: zone;
  form: FormGroup;

  constructor(
    private service: ZoneService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
  ) { 
    this.form = this._builder.group({
      name: ["", Validators.required]
    });
  }

  ngOnInit() {
    this.getZone();
  }

  getZone(){
    const id = this.routeSV.snapshot.paramMap.get("id");
    this.service.getZone(id).subscribe( (res:any) => {
      this.zone = {...res.data};
      this.form = this._builder.group({
        name: [this.zone.name, Validators.required]
      });
      this.loading=false;
    })
  }

  edit(){
    var zone: zone = {
      name: this.form.value.name,
      _id: this.zone._id,
      available: this.zone.available,
    };
    this.service.updateZone(zone).subscribe((res) => {
      this.route.navigate(["admin/zone"]);
    });
    
  }
  goBack() {
    this.route.navigate(["admin/zone"]);
  }

}
