import { Component, OnInit } from '@angular/core';
import { ingredient } from "src/app/models/ingredient";
import { IngredientService } from "src/app/services/ingredient.service";
import { CategoriesService } from "src/app/services/categories.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-filter-parent',
  templateUrl: './filter-parent.component.html',
  styleUrls: ['./filter-parent.component.scss']
})
export class FilterParentComponent implements OnInit {
  categories;
  loading=true
  filter=[];
  ingredients:ingredient[];
  list=[];

  constructor(private ing_service:IngredientService,private router:Router,private cat_service:CategoriesService) { }

  ngOnInit() {

//A CADA CHILD SE LE TIENE QUE PASAR EL ARREGLO CON LA CATEGORIA QUE NECESITA
//HAY QUE AÑADIRLE LA PROPIEDAD DE STYLE A CADA UNO DE LOS INGREDIENTES
//EL CHECK DE SI EXISTE SE DEBERIA HACER ACA EN VERDAD
    this.categories=this.cat_service.getCategories()
    console.log(this.categories)
    this.getIngredients()

    
  }

  add_to_filter(object:any){


    //ACA SE AÑADE EL ID 
    
    if(object.style==true){
      this.filter.push(object.id)

    }else{
      for (let index = 0; index < this.filter.length; index++) {

        if(object.id==this.filter[index]){
          this.filter.splice(index,1)
        }
        
      }
    }
    console.log(this.filter);


  }
  
  getIngredients() {
    this.ing_service.getIngredients().subscribe((res: any) => {
      this.ingredients = [...res.data];
      this.loading = false;
      console.log(this.ingredients);
      this.organizeIngredients()

    });
    
  }

  organizeIngredients(){

    for (let x = 0; x < this.categories.length; x++) {

      let aux_list=[]

      for (let y = 0; y < this.ingredients.length; y++) {

        if(this.categories[x]===this.ingredients[y].category){
          let k={
            'id':this.ingredients[y]._id,
            'name':this.ingredients[y].name,
            'pic':this.ingredients[y].photo,
            'style':true
          }
          aux_list.push(k)
        }
      }
      let obj={
        'category':this.categories[x],
        'hidden':true,
        'ing':aux_list
      }
      this.list.push(obj)
    }
    console.log(this.list)
  }


  ingExist(item:any){
    if(item.length!=0){
      return true
    }else{

      false
    }
  }

  filter_drink(){
    //transformamos en una variable
    let filter=this.filter.toString()

    this.router.navigate(["drinks/filtered_drinks/", filter]);
  }

  openCategory(item:any){

    for (let index = 0; index < this.list.length; index++) {
      
      if(item==this.list[index].category){
        this.list[index].hidden=false
      }else{
        this.list[index].hidden=true
      }
      
    }

  }


}
