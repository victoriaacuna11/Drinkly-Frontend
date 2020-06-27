import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { user } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import * as bcrypt from "bcryptjs";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  loading: Boolean = true;
  user: user;
  form: FormGroup;
  // selectedFile: File = null;
  categories: String[];
  changingP = false;
  formP : FormGroup;
  sidebar: Boolean;

  constructor(
    private service: UserService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private auth_svc: AuthService
  ) {
    this.form = this._builder.group({
      f_name: ["", Validators.required],
      l_name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      user_name: ["", Validators.required],
      birthday: ["", Validators.required],
    });

    this.formP = this._builder.group({
      o_password: ["", Validators.required],
      n_password: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const id = this.routeSV.snapshot.paramMap.get("id");
    this.service.getUser(id).subscribe((res: any) => {
      this.user = { ...res.data };
      this.form = this._builder.group({
        f_name: this.user.f_name,
        l_name: this.user.l_name,
        user_name: this.user.user_name,
        birthday: this.user.birthday.slice(0,10),
        email: [this.user.email, [Validators.email, Validators.required]]
      });
      this.loading = false;
    });
  }

  // onSelectedFile(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  editUser() {
    var user: user = {
      f_name: this.form.value.f_name,
      l_name: this.form.value.l_name,
      user_name: this.form.value.user_name,
      password: this.user.password,
      email: this.form.value.email,
      _id: this.user._id,
      available: true,     
      isAdmin: this.user.isAdmin,
      birthday: this.user.birthday,
      favorites: this.user.favorites,
    };
    console.log(user);

    if (true) {
      console.log(user);
      this.service.updateUser(user).subscribe((res) => {
        this.route.navigate(["profile"]);
      });
    } 
  }

  editUserPassword(){
    const salt = bcrypt.genSaltSync(10);
    var user: user = {
      f_name: this.user.f_name,
      l_name: this.user.l_name,
      user_name: this.user.user_name,
      password: bcrypt.hashSync(this.formP.value.n_password, salt),
      email: this.user.email,
      _id: this.user._id,
      available: true,     
      isAdmin: this.user.isAdmin,
      birthday: this.user.birthday,
      favorites: this.user.favorites,
    };
    console.log(user);

    if (true) {
      this.service.updateUser(user).subscribe((res) => {
        this.auth_svc.logout();
        this.route.navigate(["login"]);
      });
    } 

  }

  goBack() {
    this.route.navigate(["profile"]);
  }

  changeP(){
    this.changingP = !this.changingP;
  }

  async doChangeP(){
    let x = await this.auth_svc.getPassword().toPromise();
    console.log("yuju " + x);
    if(bcrypt.compareSync(this.formP.value.o_password, x)){
      console.log("Hola")
      this.editUserPassword();
    }else{
      var element = document.getElementById("al");
      element.style.display = "block";
      setTimeout(function() {
        element.style.display = "none";
      }, 6000);
      
    }
  }

  getMessage($event){
    this.sidebar = $event;
  }


}
