import { Component, OnInit } from '@angular/core';
import { ingredient } from 'src/app/models/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.scss']
})
export class EditIngredientComponent implements OnInit {

  loading:Boolean=true;
  ingredient: ingredient;
  form : FormGroup;
  selectedFile : File = null;
  categories : String[] ;

  constructor(private service: IngredientService, private route: Router, private routeSV: ActivatedRoute, 
    private _builder : FormBuilder, private categoriesService: CategoriesService) { 
      this.form = this._builder.group({
        name : [''],
        category : [''],
        photo: ['']
      })
    }

  ngOnInit() {
    this.getIngredient();
  }

  getIngredient(){
    const id = this.routeSV.snapshot.paramMap.get('id');
    // console.log(id);
    this.categories=this.categoriesService.getCategories();
    this.service.getIngredient(id).subscribe((res:any) => {
      this.ingredient = {...res.data};

      this.form = this._builder.group({
        name: this.ingredient.name,
        category: this.ingredient.category,
        photo: '',
      })
      this.loading=false;
    })
  }

  onSelectedFile(event){
    this.selectedFile= event.target.files[0];
  }

  editIngredient(){

    var ingredient: ingredient = {
      name: this.form.value.name,
      category: this.form.value.category,
      photo: '',
      _id: this.ingredient._id,
      available: true,
    }
    console.log(ingredient);
    console.log(this.ingredient.photo);
    console.log(this.selectedFile);

    if(this.selectedFile==null){
      console.log('hi')
      ingredient.photo= this.ingredient.photo;
      console.log(ingredient);
      this.service.updateIngredient(ingredient).subscribe(res => {
        this.route.navigate(['admin/ingredient']);
      })
    } else {
      console.log('not hi')
      let formdata = new FormData();
      formdata.append('image', this.selectedFile as any);
      formdata.append('name', ingredient.name as any);
      formdata.append('category', ingredient.category as any);
      formdata.append('available', ingredient.available as any);
      this.service.updateIngredientPhoto(formdata, this.ingredient._id).subscribe(res => {
        this.route.navigate(['admin/ingredient']);
      })
    }
  }

  goBack(){
    this.route.navigate(['admin/ingredient']);
  }
}
