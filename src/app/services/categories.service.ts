import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  /**
   * Categorías de los ingredientes con las que trabaja la aplicación.
   */
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

  /**
   * Trae las categorías de los ingredientes.
   * @returns {String[]}
   */
  getCategories(): String[]{
    return this.categories;
  }
}
