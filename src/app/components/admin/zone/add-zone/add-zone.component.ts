import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { zone } from 'src/app/models/zone';
import { ZoneService } from 'src/app/services/zone.service';

@Component({
  selector: 'app-add-zone',
  templateUrl: './add-zone.component.html',
  styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private route: Router,
    private service: ZoneService,
    ) { 
      this.form = this._builder.group({
        name: ["", Validators.required],
      });
    }

  ngOnInit() {
  }

  add() {
    const zone: zone = {
      name: this.form.value.name,
      available: true,
      _id: ""
    };
    console.log(zone);
    this.service.postZone(zone).subscribe((res) => {
      this.route.navigate(["admin/zone"]);
    });
  }

  goBack() {
    this.route.navigate(["admin/zone"]);
  }
}
