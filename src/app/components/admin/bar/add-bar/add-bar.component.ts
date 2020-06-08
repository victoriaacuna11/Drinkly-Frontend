import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Bar } from 'src/app/models/bar';

@Component({
  selector: 'app-add-bar',
  templateUrl: './add-bar.component.html',
  styleUrls: ['./add-bar.component.scss']
})
export class AddBarComponent implements OnInit {

  selectedFile: File = null;
  form: FormGroup;
  bar: Bar;

  constructor(private _builder: FormBuilder, private route: Router) {
    this.form = this._builder.group({
      name: [''],
      working_hours: [''],
      rating: 1,
      cost: 1,
      twitter: [''],
      instagram: [''],
      facebook: [''],
      email: [''],
      description: [''],
      address: [''],
      zone: [''],
      category: [''],
      photo: ['']
    })
  }

  ngOnInit() {
  }

}
