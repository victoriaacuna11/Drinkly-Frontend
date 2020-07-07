import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SendMailService } from 'src/app/services/send-mail.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-business',
  templateUrl: './post-business.component.html',
  styleUrls: ['./post-business.component.scss']
})
export class PostBusinessComponent implements OnInit {

  sidebar: Boolean;
  form: FormGroup;
  user: any;
  loading:Boolean=true;
  sending:Boolean=false;
  sent:Boolean=false;
  
  constructor(
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private service: SendMailService,
    private authService: AuthService,
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

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  goBack(){
    this.route.navigate([""]);
  }
  goHome(){
    this.route.navigate([""]);
  }

  post(){
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
