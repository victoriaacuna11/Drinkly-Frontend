
import { ListIngredientComponent } from './components/admin/ingredient/list-ingredient/list-ingredient.component';
import { EditIngredientComponent } from './components/admin/ingredient/edit-ingredient/edit-ingredient.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BarsListComponent } from "./components/bars/bars-list/bars-list.component";
import { DrinksListComponent } from "./components/drinks/drinks-list/drinks-list.component";
import { DrinksFilterComponent } from "./components/drinks/drinks-filter/drinks-filter.component";
import { AddIngredientComponent } from "./components/admin/ingredient/add-ingredient/add-ingredient.component";
import { AddBarComponent } from './components/admin/bar/add-bar/add-bar.component';

import { PruebaComponent } from "./components/prueba/prueba.component";
import { PruebaNewComponent } from "./components/prueba-new/prueba-new.component";
import { PruebaEditComponent } from "./components/prueba-edit/prueba-edit.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { from } from 'rxjs';

const routes: Routes = [
  // USERS' ROUTES

  { path: "bars", component: BarsListComponent },
  { path: "drinks", component: DrinksListComponent },
  { path: "drinks/filter", component: DrinksFilterComponent },

  // ADMIN'S ROUTES
  { path: "admin/ingredient/add", component: AddIngredientComponent },
  { path: "admin/ingredient", component: ListIngredientComponent },
  { path: "admin/ingredient/edit/:id", component: EditIngredientComponent },
  { path: "admin/bar/add", component: AddBarComponent },



  // RUTAS DE PRUEBA
  { path: "prueba", component: PruebaComponent },
  { path: "add-prueba", component: PruebaNewComponent },
  { path: "prueba/update/:id", component: PruebaEditComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
