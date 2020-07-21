import { passwordValidator } from './../../Directives/password.directive';
import { Router } from "@angular/router";
import { AuthService } from "./../../services/auth.service";
import { user } from "./../../models/user";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";

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
  form: FormGroup;
  dataRegister: any = {};
  dpConfig: Partial<BsDatepickerConfig>;
  x: Date;
  options = { day: "2-digit", month: "2-digit", year: "numeric" };
  finalDate: Date;
  sidebar: Boolean;
  err='';

  constructor(
    private _builder: FormBuilder,
    private auth_svc: AuthService,
    private router: Router
  ) {
    this.dpConfig = Object.assign(
      {},
      {
        containerClass: "theme-orange",
        showWeekNumbers: false,
        dateInputFormat: "YYYY/MM/DD",
      }
    );
    this.form = this._builder.group({
      password: ["", [Validators.required, 
        passwordValidator.patternValidator(/\d/, {hasNum: true}),
        passwordValidator.patternValidator(/[A-Z]/, {hasUpper: true}),
        passwordValidator.patternValidator(/[a-z]/, {hasLower: true}),
        Validators.minLength(8)
      ]],
      f_name: ["", Validators.required],
      l_name: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
      user_name: ["", Validators.required],
      birthday: ["", Validators.required],
    });
  }

  ngOnInit() {}

  /**
   * Toma los datos del form validado y emplea el método para registrar un nuevo usuario en la base de datos.
   * Si todo sale bien lo registra y lo lleva directo al perfil, si no te muestra el error
   */
  onSubmit() {
    let date = new Date(this.x).toLocaleString(undefined, this.options);
    let vari = date.split("/");
    let finalDate = vari[2] + "/" + vari[0] + "/" + vari[1];

    const user: user = {
      _id: "",
      password: this.form.value.password,
      f_name: this.form.value.f_name,
      l_name: this.form.value.l_name,
      email: this.form.value.email,
      user_name: this.form.value.user_name,
      birthday: finalDate,
      available: true,
      favorites: [],
      isAdmin: false,
    };


    this.auth_svc.registerUser(user).subscribe((data) => {
      this.dataRegister = data;
      if (this.dataRegister.success) {
        this.auth_svc.storeData(
          this.dataRegister.token,
          this.dataRegister.expiresIn
        );
        this.router.navigate(["/profile"]);
      } else {
        this.err='';
        for(let i of this.dataRegister.msg) {
          this.err += i + "\n";
        }
        var element = document.getElementById("al");
        element.style.display = "block";
        setTimeout(function() {
          element.style.display = "none";
        }, 6000);
      }
    });
  }

  /**
   * Setea el atributo local que mueve el contenido cuando sale el sidebar
   * @param {any} $event El evento que es pasado cuando el ícono del sidebar es clickeado
   * @returns {void} 
   */
  getMessage($event: any): void{
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

}
