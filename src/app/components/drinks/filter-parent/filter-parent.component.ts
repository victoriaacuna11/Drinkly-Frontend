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
   /**
 * Lista de las categorias de los ingredientes
 */
  categories;
  /**
 * atributo que indica si se han cargado los datos traidos de la base de datos
 */
  loading=true
  /**
 * lista de los ingredientes por los que filtraremos
 */
  filter=[];
   /**
 * lista de los ingredientes disponibles de la base de datos
 */
  ingredients:ingredient[]=[];
   /**
 * lista de los ingredientes de la base de datos
 */
  ingredientsA:ingredient[]=[];
  /**
 * lista de los ingredientes ya seleccionados en el proceso de filtrado
 */
  ing_search=[];
  /**
 * lista de los ingredientes que contienen las cosas buscadas en el searchbar
 */
  temp_i_s=[];
  /**
 * Lista de los ingredientes ordenados como los usaremos en el html
 */
  list=[];
  /**
 * Atributo que esconde y muestra el sidebar
 */
  sidebar: Boolean;
  /**
 * campo que guarda lso cambios de la busqueda de ingredientes
 */
  search_bar=""

  constructor(private ing_service:IngredientService,private router:Router,private cat_service:CategoriesService) { }

/**
 * Inicializa el componente
 * 
 */
  ngOnInit() {

//A CADA CHILD SE LE TIENE QUE PASAR EL ARREGLO CON LA CATEGORIA QUE NECESITA
//HAY QUE AÑADIRLE LA PROPIEDAD DE STYLE A CADA UNO DE LOS INGREDIENTES
//EL CHECK DE SI EXISTE SE DEBERIA HACER ACA EN VERDAD
    this.categories=this.cat_service.getCategories()
    console.log(this.categories)
    this.getIngredients()

    
  }
/**
 * Añade/elimina el ing que se busca por la barra de busqueda en el filtro
 * @param {any} object ingrediente seleccionado
 */
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
/**
 * Añade/elimina el ing seleccionado en el array de filtro (Usando los dropdowns)
 * @param {any} object ingrediente seleccionado
 */
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
/**
 * Elimina el ingrediente del array de filtro 
 * @param {any} object ingrediente deseleccionado
 */
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
/**
 * Trae los ingredientes de la base de datos
 */
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
/**
 * Añade el campo de style para los ingretientes
 * 
 */
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
/**
 * Organiza los ingredientes siguiendo la estructura para separarlos por categoria
 */
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
/**
 * Checkea si la categoria tiene ingredientes en ella
 * @return booleanso true o false
 */
  ingExist(item:any){
    if(item.length!=0){
      return true
    }else{
      false
    }
  }
/**
 * Navegamos a la vista de mostar filtro con los ing en el arreglo de filter
 */
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
/**
 * Abre la categoria seleccionaday cierra las demas
 * @param {any} item categoria
 */
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
/**
 * Muestra el componente de mostrar los ingredientes seleccionados
 * @returns boolean true o false
 */
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
/**
 * @ignore
 */
  is_search(object:any){

    let aux=object.toLowerCase()

    if(aux.includes(this.search_bar.toLowerCase())){
      return true
    }else{
      return false
    }
    


  }
/**
 * Funcion que actualiza los ingredientes mostrados en la busqueda por nombre
 */
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
/**
 * Regresa a la vista anterior
 */
goBack(){
  this.router.navigate(['drinks/'])
}


}
