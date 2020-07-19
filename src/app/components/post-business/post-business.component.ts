import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SendMailService } from 'src/app/services/send-mail.service';
import { AuthService } from 'src/app/services/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-post-business',
  templateUrl: './post-business.component.html',
  styleUrls: ['./post-business.component.scss']
})
export class PostBusinessComponent implements OnInit {

  /**
   * Maneja el responsive del sidebar.
   * @type {Boolean}
   */
  sidebar: Boolean;
  /**
   * Formulario para postear el negocio.
   */
  form: FormGroup;
  /**
   * Usuario registrado.
   */
  user: any;
  /**
   * Indica si ya se trajo o no la info de la DB.
   */
  loading:Boolean=true;
  /**
   * Indica si se está o no enviando la publicación.
   */
  sending:Boolean=false;
  /**
   * Indica si ya se envió la publicación.
   */
  sent:Boolean=false;
  
  constructor(
    private route: Router,
    private _builder: FormBuilder,
    private service: SendMailService,
    private authService: AuthService,
    private _location:Location
  ) { 
    this.form = this._builder.group({
      name: ["",Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      phone: ["",Validators.required],
      info: ["",Validators.required],
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe( (res:any) => {
      this.user = res.user;
      this.loading=false;
    })
  }

  /**
   * Muestra/Oculta el sidebar
   * @param {any} $event - Evento que ocurre al hacer click para mostrar/ocultar el menú
   * @returns {void}
   */
  getMessage($event:any):void{
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  /**
   * Navega al home
   * @returns {void}
   */
  goHome():void{
    this.route.navigate([""]);
  }

  /**
   * Regresa a la ruta anterior.
   * @returns {void}
   */
  goBack():void{
    this._location.back()
  }

  /**
   * Verifica el form y publica la receta.
   * @returns {void}
   */
  post():void{
    this.sending=true;
    let data = {
      name: this.form.value.name,
      email: this.form.value.email,
      phone: this.form.value.phone,
      info: this.form.value.info,
      username: this.user.user_name,
      useremail: this.user.email,
      user_fname: this.user.f_name,
    }
    console.log(data);
    this.service.postBusiness(data).subscribe(res => {
      this.service.sendEmailUserBusiness(data).subscribe(res => {
        this.sent=true;
        this.sending=false;
      })
    })
    
  }

}
