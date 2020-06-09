import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BarsListComponent } from "./components/bars/bars-list/bars-list.component";
import { DrinksListComponent } from "./components/drinks/drinks-list/drinks-list.component";
import { DrinksFilterComponent } from "./components/drinks/drinks-filter/drinks-filter.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  { path: "bars", component: BarsListComponent },
  { path: "drinks", component: DrinksListComponent },
  { path: "drinks/filter", component: DrinksFilterComponent },
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
