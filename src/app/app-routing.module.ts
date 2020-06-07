import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BarsListComponent} from './components/bars/bars-list/bars-list.component';
import {DrinksListComponent} from './components/drinks/drinks-list/drinks-list.component';
import {DrinksFilterComponent} from './components/drinks/drinks-filter/drinks-filter.component';
import {AddIngredientComponent} from './components/admin/ingredient/add-ingredient/add-ingredient.component';

import {PruebaComponent} from './components/prueba/prueba.component';
import {PruebaNewComponent} from './components/prueba-new/prueba-new.component';
import {PruebaEditComponent} from './components/prueba-edit/prueba-edit.component';

const routes: Routes = [

  // USERS' ROUTES

  { path: "bars", component: BarsListComponent },
  { path: "drinks", component: DrinksListComponent },
  { path: "drinks/filter", component: DrinksFilterComponent },
  
  // ADMIN'S ROUTES
  { path: "admin/ingredient/add", component: AddIngredientComponent },

  // RUTAS DE PRUEBA
  {path: 'prueba', component: PruebaComponent},
  {path: 'add-prueba', component: PruebaNewComponent},
  { path: 'prueba/update/:id', component: PruebaEditComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
