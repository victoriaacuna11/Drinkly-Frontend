import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {game} from './../../../../models/game';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent implements OnInit {

  form: FormGroup;
  game: game;
  main_image: String = null;
  rules: String[] = [];

  constructor(
    private _builder: FormBuilder,
    private route: Router,
    private service: GameService,
    private storage: AngularFireStorage
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

  addRuleGroup() {
    return this._builder.group({
      rule: ["", Validators.required],
    });
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

  create(){
    if(this.main_image!=null){

      let rules: String[]=[]
      this.form.value.rules.forEach((item) => {
        rules.push(item.rule);
      });
      const game: game = {
        name: this.form.value.name,
        description: this.form.value.description,
        available: true,
        rules: rules,
        photo: this.main_image,
        _id: "",
      }
      this.service.postGame(game).subscribe(res => {
        this.route.navigate(["admin/game"]);
      })

    } else {
      const response = alert(
        "Debe introducir una imagen como ícono."
      );
    }
    
    
  }

  goBack() {
    this.route.navigate(["admin/game"]);
  }

  
}
