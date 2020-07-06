import { Component, OnInit } from '@angular/core';
import { ingredient } from "src/app/models/ingredient";
import { IngredientService } from "src/app/services/ingredient.service";
import { CategoriesService } from "src/app/services/categories.service";
import { Router } from "@angular/router";
import { style } from '@angular/animations';

@Component({
  selector: 'app-filter-parent',
  templateUrl: './filter-parent.component.html',
  styleUrls: ['./filter-parent.component.scss']
})
export class FilterParentComponent implements OnInit {
  categories;
  loading=true
  filter=[];
  ingredients:ingredient[]=[];
  ingredientsA:ingredient[]=[];
  ing_search=[];
  temp_i_s=[];
  list=[];
  sidebar: Boolean;
  search_bar=""

  constructor(private ing_service:IngredientService,private router:Router,private cat_service:CategoriesService) { }

  ngOnInit() {

//A CADA CHILD SE LE TIENE QUE PASAR EL ARREGLO CON LA CATEGORIA QUE NECESITA
//HAY QUE AÑADIRLE LA PROPIEDAD DE STYLE A CADA UNO DE LOS INGREDIENTES
//EL CHECK DE SI EXISTE SE DEBERIA HACER ACA EN VERDAD
    this.categories=this.cat_service.getCategories()
    console.log(this.categories)
    this.getIngredients()

    
  }

  search_add_to_filter(object:any){

    if(object.style==true){
      this.filter.push(object)
    }else{
      for (let index = 0; index < this.filter.length; index++) {
        if(object.id==this.filter[index].id){
          this.filter.splice(index,1)
        }
      }
    }
    console.log(this.filter);
    object.style=!object.style

    //sacar de otro filtro

    for (let x = 0; x < this.list.length; x++) {
        if(this.list[x].category==object.category){
          console.log(object.category)
          for (let y = 0; y < this.list[x].ing.length; y++) {
            if(this.list[x].ing[y].id==object.id){
              console.log(object.name)
              this.list[x].ing[y].style=object.style
              y=this.list[x].ing.length
            }
          }
          x=this.list.length
        }      
    }


  }

  add_to_filter(object:any){
    if(object.style==true){
      this.filter.push(object)
    }else{
      for (let index = 0; index < this.filter.length; index++) {
        if(object.id==this.filter[index].id){
          this.filter.splice(index,1)
        }
      }
    }

    console.log(this.filter);

    //sacar del otro filtro

    for (let index = 0; index < this.ing_search.length; index++) {
      if(this.ing_search[index].id==object.id){
        this.ing_search[index].style=!object.style
        index=this.ing_search.length
      }
      
    }


  }

  ing_check_off(object:any){
    for (let x = 0; x < this.list.length; x++) {
      for (let y = 0; y < this.list[x].ing.length; y++) {
        if(this.list[x].ing[y].id==object.id){
          this.list[x].ing[y].style=true
        }  

      }
            
    }

    //deseleccionar en ing searxh
    for (let index = 0; index < this.ing_search.length; index++) {
      if(object.id==this.ing_search[index].id){
        this.ing_search[index].style=true
      }
    }


    for (let index = 0; index < this.filter.length; index++) {
        if(this.filter[index].id==object.id){
          this.filter.splice(index,1)
        }      
    }

    console.log(this.filter)

  }
  
  getIngredients() {
    this.ing_service.getIngredients().subscribe((res: any) => {
      this.ingredientsA = [...res.data];
      this.ingredientsA.forEach(i=>{
        if(i.available==true){
          this.ingredients.push(i)
        }
      })
      console.log(this.ingredients);
      this.organizeIngredients()
      this.addStyleIng()
      this.loading = false;

    });
    
  }

  addStyleIng(){
    this.ingredients.forEach(i=>{
      let ing={
        'id':i._id,
        'name':i.name,
        'pic':i.photo,
        'category':i.category,
        'style':true
      }
      this.ing_search.push(ing)
    })
  }

  organizeIngredients(){

    for (let x = 0; x < this.categories.length; x++) {

      let aux_list=[]

      for (let y = 0; y < this.ingredients.length; y++) {

        if(this.categories[x]===this.ingredients[y].category && this.ingredients[y].available==true){
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

    if(this.filter.length!=0){

    
    let filter_id=[];
    for (let index = 0; index < this.filter.length; index++) {
        filter_id.push(this.filter[index].id)
    }
    let filter=filter_id.toString()

    this.router.navigate(["drinks/filtered_drinks/", filter]);

    }else{
      const response = alert(
        "Seleccione por lo menos un ingrediente por el que quiera filtrar"
      );
    }
  }

  openCategory(item:any){
    for (let index = 0; index < this.list.length; index++) { 
      if(item.category==this.list[index].category){
        if(this.list[index].hidden==false){
          this.list[index].hidden=true
        }else{
          this.list[index].hidden=false
        }
      }else{
        this.list[index].hidden=true
      } 
    }
  }
  show_ing(){
    if(this.filter.length!=0){
      return true
    }else{
      return false
    }
  }

  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }

  is_search(object:any){

    let aux=object.toLowerCase()

    if(aux.includes(this.search_bar.toLowerCase())){
      return true
    }else{
      return false
    }
    


  }

  search_ing(){

    this.temp_i_s=[]
    
    if(this.search_bar==""){

    }else{ 

    
    
    for (let index = 0; index < this.ing_search.length; index++) {
        
      let aux_ing=this.ing_search[index].name.toLowerCase()
      if(aux_ing.includes(this.search_bar.toLowerCase())){

        let aux= this.ing_search[0]
        this.temp_i_s.push(this.ing_search[index])


      }
      
    }

  }
}


}
