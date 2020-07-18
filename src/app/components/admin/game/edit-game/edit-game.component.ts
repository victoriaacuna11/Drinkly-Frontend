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

  /**
   * Juego que se va a edita.
   */
  game: game;
  /**
   * Loader (maneja si la información ya se trajo o no de la DB)
   */
  loading: Boolean=true;
  /**
   * Formulario de los datos del bar a editar.
   */
  form: FormGroup;
  /**
   * link de la imagen principal del juego.
   */
  main_image: String= null;
  /**
   * Boolean que maneja el responsive del sidebar.
   */
  sidebar: Boolean;
  /**
   * Boolean que se encarga de informar si existe información que se está o no enviando a la DB.
   */
  updating:Boolean=false;
  
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

  /**
   * Crea el form group para la nueva regla.
   * @returns {any}
   */
  addRuleGroup():any {
    return this._builder.group({
      rule: ["", Validators.required],
    });
  }
  
  /** 
   * Crea el form group con los datos de las reglas
   * @param {String} rule - Regla
   * @returns {any}
   */
  addRuleGroupWithValue(rule:String):any {
    return this._builder.group({
      rule: [rule, Validators.required]
    })
  }

  get RulesArray() {
    return <FormArray>this.form.get("rules");
  }

  /**
   * Le permite al usuario añadir una nueva regla.
   * @returns {void}
   */
  addRule() {
    this.RulesArray.push(this.addRuleGroup());
  }

  /**
   * Le permite al usuario eliminar una de las reglas añadidas.
   * @param {number} index -index del vector de reglas.
   * @returns {void}
   */
  deleteRule(index:number) {
    this.RulesArray.removeAt(index);
  }

  /**
   * Le permite al usuario subir una imagen desde un archivo de su coputadora.
   * @param {any} event - evento donde el usuario selecciona la imagen.
   * @returns {void}
   */
  uploadEnRes(event:any):void {
    this.main_image = event.thumbnail;
  }

  /**
   * Elimina la iamgen de firebase y le permite al usuario subir otra.
   * @param {any} url - link de la imagen guarda en firebase.
   * @returns {any}
   */
  changeImage(url:any):any {
    return this.storage.storage
      .refFromURL(url)
      .delete()
      .then((res) => {
        this.main_image = null;
      });
  }

  /**
   * Trae el juego que se quiere editar de la DB.
   * @returns {void}
   */
  getGame():void{
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

  /**
   * Verifica el formulario y edita el juego en la DB.
   * @returns {void}
   */
  update():void{

    if(this.main_image!=null){
      this.updating=true;
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

  /**
   * Navega a la lista de juegos.
   * @returns {void}
   */
  goBack():void{
    if(this.main_image==null || this.main_image!=this.game.photo){
      const response = alert(
        "Ya borró la imagen que previamente tenía como ícono. Por favor seleccione una nueva y guarde el cambio."
      );
    } else {
      this.route.navigate(["admin/game"]);
    }
    
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

}
