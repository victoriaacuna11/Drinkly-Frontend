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
  sidebar: Boolean;

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

  /**
   * Emplea los métodos del servicio para autenticar al usuario que quiere ingresar a la página, 
   * navega al perfil si todo sale bien con el token de la sesión, o muestra el error si algo sale mal
   */
  onSubmit() {

    const c_user = {
      user_name: this.form.value.user_name,
      password: this.form.value.password,
    };
    this.auth_svc.authenticateUser(c_user).subscribe((data) => {
      this.dataRegister = data;
     
      if (this.dataRegister.success && this.dataRegister.user.available) {
        this.auth_svc.storeData(
          this.dataRegister.token,
          //this.dataRegister.user,
          this.dataRegister.expiresIn
        );
        this.router.navigate(["profile"]);
      } else {
        var element = document.getElementById("al");
        element.style.display = "block";
        setTimeout(function() {
          element.style.display = "none";
        }, 10000);        
        console.log("Hubo un error:" + this.dataRegister.msg);
        this.router.navigate(["login"]);
      }
    });
  }

    /**
   * Setea el atributo local que mueve el contenido cuando sale el sidebar
   * @param {any} $event El evento que es pasado cuando el ícono del sidebar es clickeado
   * @returns {void} 
   */
  getMessage($event:any):void{
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
}
