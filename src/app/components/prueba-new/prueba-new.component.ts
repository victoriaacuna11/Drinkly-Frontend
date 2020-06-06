import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {PruebaService} from './../../services/prueba.service';
import {userP} from '../../models/user-p';
import { Router } from '@angular/router';


@Component({
  selector: 'app-prueba-new',
  templateUrl: './prueba-new.component.html',
  styleUrls: ['./prueba-new.component.scss']
})
export class PruebaNewComponent implements OnInit {
  form : FormGroup;
  
  constructor(
    private _builder : FormBuilder, private prueba : PruebaService, private route: Router
  ) { 
    this.form = this._builder.group({
      firstname : [''],
      lastname : [''],
      email: ['']
    })
  }

  ngOnInit() {
  }

  createUser(){
    // console.log(values);
    // e.preventDefault();
    const user : userP = {
      firstName: this.form.value.firstname,
      lastName: this.form.value.lastname,
      email: this.form.value.email,
      _id: '',
      editable: false
    }
    // console.log(user);
    this.prueba.postUser(user).subscribe(res => {
      console.log(res);
      this.route.navigate(['prueba']);
    });
  }

}
