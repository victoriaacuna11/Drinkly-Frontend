import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { user } from "./../../models/user";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  password: String;
  f_name: String;
  l_name: String;
  email: String;
  user_name: String;
  birthday: Date;
  available: boolean;
  favorites: String[];
  form: FormGroup;
  dataRegister: any = {};

  constructor(
    private _builder: FormBuilder,
    private auth_svc: AuthService,
    private router: Router
  ) {
    this.form = this._builder.group({
      password: ["", Validators.required],
      f_name: ["", Validators.required],
      l_name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      user_name: ["", Validators.required],
      birthday: ["", Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    const user: user = {
      _id: "",
      password: this.form.value.password,
      f_name: this.form.value.f_name,
      l_name: this.form.value.l_name,
      email: this.form.value.email,
      user_name: this.form.value.user_name,
      birthday: this.form.value.birthday,
      available: true,
      favorites: [],
    };

    console.log(user);

    this.auth_svc.registerUser(user).subscribe((data) => {
      this.dataRegister = data;
      if (this.dataRegister.success) {
        console.log("Te acabas de registrar.");
        this.router.navigate(["/login"]);
      } else {
        console.log("Algo salió mal.");
        this.router.navigate(["/register"]);
      }
    });
  }
}
