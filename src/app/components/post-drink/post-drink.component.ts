import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { SendMailService } from 'src/app/services/send-mail.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-post-drink',
  templateUrl: './post-drink.component.html',
  styleUrls: ['./post-drink.component.scss']
})
export class PostDrinkComponent implements OnInit {

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
      description: ["",Validators.required],
      recipe: ["",Validators.required],
      anonymous: false,
      ingredients: this._builder.array([
        this.addIngredientGroup()
      ]),
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

  addIngredientGroup() {
    return this._builder.group({
      ingredient: ["", Validators.required],
    });
  }

  get IngredientArray() {
    return <FormArray>this.form.get("ingredients");
  }

  addIngredient() {
    this.IngredientArray.push(this.addIngredientGroup());
  }

  deleteIngredient(index) {
    this.IngredientArray.removeAt(index);
  }

  goBack(){
    this.route.navigate([""]);
  }

  postRecipe(){
    this.sending=true;
    console.log(this.form.value.recipe)
    let ingredients: String [] = [];
    this.form.value.ingredients.forEach(element => {
      ingredients.push(element.ingredient);
    });
    let message:String='El usuario desea que le den créditos por la receta.'
    if(this.form.value.anonymous){
      message='El usuario no desea que le den créditos por la receta. La publicó como anónimo.'
    }
    let data = {
      email: this.user.email,
      username: this.user.user_name,
      owner_name: this.user.f_name,
      name: this.form.value.name,
      description: this.form.value.description,
      recipe: this.form.value.recipe,
      ingredients: ingredients,
      message: message,
    }
    console.log(data);
    this.service.postRecipe(data).subscribe(res => {
      this.service.sendEmailUser(data).subscribe(res => {
        this.sent=true;
      })
    })
  }

  keepPosting(){
    // this.route.navigate(["post-drink"]);
    window.location.reload()
  }

  goHome(){
    this.route.navigate([""]);
  }

}
