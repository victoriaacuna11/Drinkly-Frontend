import { Component, OnInit } from "@angular/core";
import { IngredientService } from "src/app/services/ingredient.service";
import { ingredient } from "./../../../../models/ingredient";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoriesService } from 'src/app/services/categories.service';
import { AngularFireStorage } from "@angular/fire/storage";

@Component({
  selector: "app-add-ingredient",
  templateUrl: "./add-ingredient.component.html",
  styleUrls: ["./add-ingredient.component.scss"],
})
export class AddIngredientComponent implements OnInit {

  selectedFile: File = null;
  categories: String[] = null;
  form: FormGroup;
  main_image: String=null;
  sidebar: Boolean;
  
  constructor(
    private service: IngredientService,
    private _builder: FormBuilder,
    private route: Router,
    private categoryService: CategoriesService,
    private storage: AngularFireStorage
  ) {
    this.form = this._builder.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
    });
  }

  ngOnInit() {
    this.categories=this.categoryService.getCategories();
  }


  addIngredient() {
    if(this.main_image!=null){
      const ingredient: ingredient = {
        name: this.form.value.name,
        category: this.form.value.category,
        photo: this.main_image,
        _id: "",
        available: true,
      };
      console.log(ingredient);
      this.service.createIngredient(ingredient).subscribe((res) => {
        this.route.navigate(["admin/ingredient"]);
      });
    } else {
      const response = alert(
        "No ha subido ninguna imagen. Por favor, suba una."
      );
    }
    
  }

  goBack() {
    this.route.navigate(["admin/ingredient"]);
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

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
}
