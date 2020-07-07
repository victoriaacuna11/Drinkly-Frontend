import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';
import { Router, ActivatedRoute } from '@angular/router';
import { drink } from 'src/app/models/drink';
import { ingredient } from "src/app/models/ingredient";
import { IngredientService } from "src/app/services/ingredient.service";
import { CategoriesService } from 'src/app/services/categories.service';
import { style } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-show-filter',
  templateUrl: './show-filter.component.html',
  styleUrls: ['./show-filter.component.scss']
})
export class ShowFilterComponent implements OnInit {

  sidebar: Boolean;
  constructor(
    private service: DrinkService,
    private route: Router,
    private routeSV: ActivatedRoute,
    private ing_service:IngredientService,
    private cat_service:CategoriesService,
    private router:Router,
    private auth_svc:AuthService, 
    private user_s:UserService
  ) { }

  filter_ing=[];
  filter=[];
  aux;
  aux2;
  drinks:drink[]=[];
  drinksA:drink[]=[];
  ingredients_aux:ingredient[]=[];
  ingredients:ingredient[]=[];
  ing_filter:ingredient[]=[];
  loading=true;
  filter_again=false;
  ing_search=[];
  temp_i_s=[];
  list=[];
  search_bar=""
  categories=[]
  user:user;

  ngOnInit() {    
    this.aux=this.routeSV.snapshot.paramMap.get('filter');
    this.filter_ing=this.aux.split(',')
    this.getIngredients();
    this.getFilteredDrinks();
    

    //console.log(this.filter_ing)
  }
  getFilteredDrinks() {
    this.service.filteredDrink(this.aux).subscribe((res: any) => {
      this.drinks = res.data;
      this.drinks.forEach(i =>{
        if(i.available){
          this.drinksA.push(i);
        }
      })
      
      this.getProfile();
      this.filter_ing=this.aux.split(',')
     // console.log(this.drinks)
    });
    
  }

  
  fav(event:Event ,drink:any){
    event.stopPropagation();
    if(this.user.favorites.includes(drink)){

      for (let index = 0; index < this.user.favorites.length; index++) {
        if(this.user.favorites[index]==drink){
          this.user.favorites.splice(index,1);
        }
      }

      this.updateUser();

    }else{
      this.user.favorites.push(drink);
      this.updateUser();

    }

    console.log(this.user)
  }
  is_fav(id:any){
    if(this.user.favorites.includes(id)){
      return true
    }else{
      return false
    }
  }
  updateUser(){

    var user: user = {
      f_name: this.user.f_name,
      l_name: this.user.l_name,
      user_name: this.user.user_name,
      password: this.user.password,
      email: this.user.email,
      _id: this.user._id,
      available: true,     
      isAdmin: this.user.isAdmin,
      birthday: this.user.birthday,
      favorites: this.user.favorites,
    };

    console.log(user);
    this.user_s.updateUser(user).subscribe((res:any) => {
    });
  }

  getProfile(){
    this.auth_svc.getProfile().subscribe(
      (profile:any)=>{
        this.user=profile.user;
        console.log(this.user)
        this.loading = false;
      },
      (err)=>{
        console.log(err)
        return false
      }
      
    )

    
  }


  getMessage($event){
    if(screen.width>640){
      this.sidebar = $event;
    }
  }
  detail(id){
    this.route.navigate(['drink/', id]);
  }
  getIngredients() {
    this.ing_service.getIngredients().subscribe((res: any) => {
      this.ingredients_aux = [...res.data];
      //console.log(this.ingredients);
      this.ingredients_aux.forEach(i =>{
        if(i.available){
          this.ingredients.push(i);
        }
      })
      this.categories=this.cat_service.getCategories();
      this.getIngrFilter();
      this.organizeIngredients();
      this.addStyleIng();
      this.fill_filter();

      this.loading = false;
    }); 
  }

  fill_filter(){
    //metemos en el arrya de filtro los que ya tenemos y ponemos los styles e true
    //cambiar a los objetos completos

    this.ing_filter.forEach(i=>{
      let ing={
        'id':i._id,
        'name':i.name,
        'category':i.category,
        'style':false,
        'pic':i.photo
      }
      this.filter.push(ing)
    })


  

    for (let x = 0; x < this.list.length; x++) {
      for (let y = 0; y < this.list[x].ing.length; y++) {
        
        if(this.filter_ing.includes(this.list[x].ing[y].id)){
          this.list[x].ing[y].style=false
        }
        
      }      
    }

    for (let index = 0; index < this.ing_search.length; index++) {
          if (this.filter_ing.includes(this.ing_search[index].id)) {
            this.ing_search[index].style=false
          }      
    }


  }

  getIngrFilter(){

    this.ingredients.forEach(i=>{
      if(this.filter_ing.includes(i._id)){
        this.ing_filter.push(i)
      }
    })
      //console.log(this.ing_filter)
  }



  //FILTER----------------------------------------------------------------------------------------------------

  
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
          //console.log(object.category)
          for (let y = 0; y < this.list[x].ing.length; y++) {
            if(this.list[x].ing[y].id==object.id){
              //console.log(object.name)
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
   // console.log('esta es la lista')
    //console.log(this.list)
  }

  ingExist(item:any){
    if(item.length!=0){
      return true
    }else{
      false
    }
  }

  filter_drink(){

    //reinicar todo otra vez de una manera boleta elmio

    //transformamos en una variable
    //poner esto en el beta de las drinks
    this.filter_again=false
    
    if(this.filter.length!=0){
    let filter_id=[];
    for (let index = 0; index < this.filter.length; index++) {
        filter_id.push(this.filter[index].id)
    }

    this.aux=filter_id.toString()

    this.router.navigate(["drinks/filtered_drinks/", this.aux]);

    }else{
      const response = alert(
        "Seleccione por lo menos un ingrediente por el que quiera filtrar"
      );
    }

    this.ing_search=[];
    this.temp_i_s=[];
    this.list=[];
    this.search_bar=""
    this.categories=[]
    this.filter_ing=[];
    this.filter=[];
    this.drinks=[];
    this.drinksA=[];
    this.ingredients_aux=[];
    this.ingredients=[];
    this.ing_filter=[];
    
    this.filter_ing=this.aux.split(',')
    this.loading=true
    this.getIngredients();
    this.getFilteredDrinks();
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

goBack(){
  this.router.navigate(["drinks/filter/"])
}

}
