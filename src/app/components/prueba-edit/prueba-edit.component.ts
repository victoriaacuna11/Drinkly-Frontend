import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PruebaService } from 'src/app/services/prueba.service';
import { userP } from 'src/app/models/user-p';
import { FormGroup, FormBuilder } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-prueba-edit',
  templateUrl: './prueba-edit.component.html',
  styleUrls: ['./prueba-edit.component.scss']
})
export class PruebaEditComponent implements OnInit {

  form : FormGroup;
  user : userP;
  loading:Boolean=true;

  constructor(private routeSV: ActivatedRoute, private prueba: PruebaService, private _builder : FormBuilder, 
    private route: Router) {
    this.form = this._builder.group({
      firstname : [''],
      lastname : [''],
      email: ['']
    })
   }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    const id = this.routeSV.snapshot.paramMap.get('id');
    // console.log(id);
    this.prueba.getUser(id).subscribe((res:any) => {
      this.user=res.data;
      this.form = this._builder.group({
        firstname : this.user.firstName,
        lastname : this.user.lastName,
        email: this.user.email
      })
      this.loading=false;
    })
  }

  updateUser(){
    const user : userP = {
      firstName: this.form.value.firstname,
      lastName: this.form.value.lastname,
      email: this.form.value.email,
      _id: this.user._id,
      editable: false
    }
    // console.log(user);
    this.prueba.updateUser(user).subscribe(res => {
      this.route.navigate(['prueba']);
    })
  }

  goBack(){
    this.route.navigate(['prueba']);
  }

}
