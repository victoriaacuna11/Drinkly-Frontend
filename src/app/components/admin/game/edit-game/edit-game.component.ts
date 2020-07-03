import { Component, OnInit } from '@angular/core';
import { game } from 'src/app/models/game';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.scss']
})
export class EditGameComponent implements OnInit {

  game: game;
  loading: Boolean=true;
  form: FormGroup;
  main_image: String= null;
  sidebar: Boolean;
  
  constructor(
    private service: GameService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private storage: AngularFireStorage,
  ) { 
    this.form = this._builder.group({
      name: ["", Validators.required],
      description: ["", Validators.required],
      rules: this._builder.array([
        this.addRuleGroup()
      ]),
    });
  }

  ngOnInit() {
    this.getGame();
  }

  addRuleGroup() {
    return this._builder.group({
      rule: ["", Validators.required],
    });
  }

  addRuleGroupWithValue(rule) {
    return this._builder.group({
      rule: [rule, Validators.required]
    })
  }

  get RulesArray() {
    return <FormArray>this.form.get("rules");
  }

  addRule() {
    this.RulesArray.push(this.addRuleGroup());
  }

  deleteRule(index) {
    this.RulesArray.removeAt(index);
  }

  uploadEnRes(event) {
    this.main_image = event.thumbnail;
  }

  changeImage(url) {
    return this.storage.storage
      .refFromURL(url)
      .delete()
      .then((res) => {
        this.main_image = null;
      });
  }

  getGame(){
    const id = this.routeSV.snapshot.paramMap.get("id");
    this.service.getGame(id).subscribe( (res:any) => {
      this.game = {...res.data};
      this.main_image = this.game.photo;
      this.form = this._builder.group({
        name: [this.game.name, Validators.required],
        description: [this.game.description, Validators.required],
        rules: this._builder.array([
          this.addRuleGroup()
        ]),
      });
      this.game.rules.forEach(item => {
        this.RulesArray.push(this.addRuleGroupWithValue(item));
      });
      this.deleteRule(0);
      this.loading=false;
    })
  }

  update(){

    if(this.main_image!=null){
      let rules : String[]=[];
      this.form.value.rules.forEach((item) => {
        rules.push(item.rule);
      });
      var game: game = {
        name: this.form.value.name,
        _id: this.game._id,
        available: this.game.available,
        description: this.form.value.description,
        rules: rules,
        photo: this.main_image
      };
      this.service.updateGame(game).subscribe((res) => {
        this.route.navigate(["admin/game"]);
      });
    } else {
      const response = alert(
        "Debe introducir una imagen como ícono."
      );
    }
  
  }
  goBack() {
    if(this.main_image==null || this.main_image!=this.game.photo){
      const response = alert(
        "Ya borró la imagen que previamente tenía como ícono. Por favor seleccione una nueva y guarde el cambio."
      );
    } else {
      this.route.navigate(["admin/game"]);
    }
    
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

}
