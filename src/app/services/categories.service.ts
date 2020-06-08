import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories : String[] = [
    'Amargos',
    'Cervezas', 
    'Destilados',
    'Especias',
    'Frutas',
    'Hierbas', 
    'Licores',
    'Sirope',
    'Vinos y champañas',
    'Otros'
  ]
  constructor() { }

  getCategories(){
    return this.categories;
  }
}
