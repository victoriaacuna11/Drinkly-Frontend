import { Component, OnInit } from "@angular/core";
import { ingredient } from "src/app/models/ingredient";
import { IngredientService } from "src/app/services/ingredient.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CategoriesService } from "src/app/services/categories.service";
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: "app-edit-ingredient",
  templateUrl: "./edit-ingredient.component.html",
  styleUrls: ["./edit-ingredient.component.scss"],
})
export class EditIngredientComponent implements OnInit {
  loading: Boolean = true;
  ingredient: ingredient;
  form: FormGroup;
  main_image: String;
  // selectedFile: File = null;
  categories: String[];

  constructor(
    private service: IngredientService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private _builder: FormBuilder,
    private categoriesService: CategoriesService,
    private storage: AngularFireStorage
  ) {
    this.form = this._builder.group({
      name: [""],
      category: [""],
    });
  }

  ngOnInit() {
    this.getIngredient();
  }

  getIngredient() {
    const id = this.routeSV.snapshot.paramMap.get("id");
    this.categories = this.categoriesService.getCategories();
    this.service.getIngredient(id).subscribe((res: any) => {
      this.ingredient = { ...res.data };
      this.main_image=this.ingredient.photo;
      this.form = this._builder.group({
        name: this.ingredient.name,
        category: this.ingredient.category
      });
      this.loading = false;
    });
  }

  // onSelectedFile(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  editIngredient() {
    console.log(this.main_image)
    var ingredient: ingredient = {
      name: this.form.value.name,
      category: this.form.value.category,
      photo: this.main_image,
      _id: this.ingredient._id,
      available: true,
    };
    console.log(ingredient);
    console.log(this.ingredient.photo);
    // console.log(this.selectedFile);

    if (this.main_image != null) {
      console.log(ingredient);
      this.service.updateIngredient(ingredient).subscribe((res) => {
        this.route.navigate(["admin/ingredient"]);
      });
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
}
