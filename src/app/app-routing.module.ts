import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BarsListComponent} from './components/bars/bars-list/bars-list.component';
import {DrinksListComponent} from './components/drinks/drinks-list/drinks-list.component';
import {DrinksFilterComponent} from './components/drinks/drinks-filter/drinks-filter.component';

import {PruebaComponent} from './components/prueba/prueba.component';
import {PruebaNewComponent} from './components/prueba-new/prueba-new.component';
import {PruebaEditComponent} from './components/prueba-edit/prueba-edit.component';
import { FilterParentComponent } from './components/drinks/filter-parent/filter-parent.component';

const routes: Routes = [

  { path: "bars", component: BarsListComponent },
  { path: "drinks", component: DrinksListComponent },
  { path: "drinks/filter", component: FilterParentComponent },

  {path: 'prueba', component: PruebaComponent},
  {path: 'add-prueba', component: PruebaNewComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
