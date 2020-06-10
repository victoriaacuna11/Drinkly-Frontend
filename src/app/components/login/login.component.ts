import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  form: FormGroup;
  dataRegister: any = {};

  constructor(
    private _builder: FormBuilder,
    private auth_svc: AuthService,
    private router: Router
  ) {
    this.form = this._builder.group({
      password: [""],
      user_name: [""],
    });
  }

  ngOnInit() {}

  onSubmit() {
    console.log(this.form.value.user_name);

    const c_user = {
      user_name: this.form.value.user_name,
      password: this.form.value.password,
    };

    this.auth_svc.authenticateUser(c_user).subscribe((data) => {
      this.dataRegister = data;
      console.log(this.dataRegister);
      if (this.dataRegister.success) {
        this.auth_svc.storeData(
          this.dataRegister.token,
          this.dataRegister.user
        );
        console.log("Bienvenido!");
        this.router.navigate(["profile"]);
      } else {
        console.log("Hubo un error:" + this.dataRegister.msg);
        this.router.navigate(["login"]);
      }
    });
  }
}
