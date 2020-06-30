import { TestBarComponent } from './components/test-bar/test-bar.component';
import { DetailBarComponent } from './components/bars/detail-bar/detail-bar.component';
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';
import { AdminAuthGuard } from "./guards/adminAuth.guard";
import { ProfileComponent } from "./components/profile-page/profile/profile.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

import { ListIngredientComponent } from "./components/admin/ingredient/list-ingredient/list-ingredient.component";
import { EditIngredientComponent } from "./components/admin/ingredient/edit-ingredient/edit-ingredient.component";
import { NgModule, InjectionToken } from "@angular/core";
import { Routes, RouterModule, ActivatedRouteSnapshot } from "@angular/router";
import { BarsListComponent } from "./components/bars/bars-list/bars-list.component";
import { DrinksListComponent } from "./components/drinks/drinks-list/drinks-list.component";
import { DrinksFilterComponent } from "./components/drinks/drinks-filter/drinks-filter.component";
import { AddIngredientComponent } from "./components/admin/ingredient/add-ingredient/add-ingredient.component";
import { AddBarComponent } from "./components/admin/bar/add-bar/add-bar.component";
import { JuegosComponent } from "./components/juegos/juegos.component";
import { ListBarComponent } from "./components/admin/bar/list-bar/list-bar.component";
import { EditBarComponent } from "./components/admin/bar/edit-bar/edit-bar.component";
import { RecipeComponent } from "./components/recipe/recipe.component";
import { HomeComponent } from "./components/home/home.component";
import { AdminHomeComponent} from "./components/admin/admin-home/admin-home.component";


import { NotFoundComponent } from "./components/not-found/not-found.component";
import { AuthGuard } from "./guards/auth.guard";
import { from } from "rxjs";

import { FilterParentComponent } from "./components/drinks/filter-parent/filter-parent.component";
import { ListDrinkComponent } from "./components/admin/drink/list-drink/list-drink.component";
import { AddDrinkComponent } from "./components/admin/drink/add-drink/add-drink.component";
import { EditDrinkComponent } from "./components/admin/drink/edit-drink/edit-drink.component";
import { EditUserComponent } from './components/profile-page/edit-user/edit-user.component';
import {AddZoneComponent} from './components/admin/zone/add-zone/add-zone.component';
import {EditZoneComponent} from './components/admin/zone/edit-zone/edit-zone.component';
import {ListZoneComponent} from './components/admin/zone/list-zone/list-zone.component';
import {ListGameComponent} from './components/admin/game/list-game/list-game.component';
import {EditGameComponent} from './components/admin/game/edit-game/edit-game.component';
import {AddGameComponent} from './components/admin/game/add-game/add-game.component';
import { ShowFilterComponent } from './components/drinks/show-filter/show-filter.component';
import { ListAdComponent } from './components/admin/ad/list-ad/list-ad.component';
import { AddAdComponent } from './components/admin/ad/add-ad/add-ad.component';
import { EditAdComponent } from './components/admin/ad/edit-ad/edit-ad.component';
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
import {NavbarComponent} from './components/navbar/navbar.component';
import {PostDrinkComponent} from './components/post-drink/post-drink.component';

const routes: Routes = [

   {
    path: "navbar",
    component: NavbarComponent,
   },

  // USERS' ROUTES

  {
    path: "bars",
    component: BarsListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "drinks", 
    component: DrinksListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "bar/:id", 
    component: DetailBarComponent, 
    canActivate: [AuthGuard]},
  {
    path: "drinks/filter",
    component: FilterParentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "drinks/filtered_drinks/:filter",
    component: ShowFilterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "post-drink",
    component: PostDrinkComponent,
    canActivate: [AuthGuard],
  },


  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "edit-user/:id", component: EditUserComponent, canActivate: [AuthGuard] },
  {
    path: 'externalRedirect',
    canActivate: [externalUrlProvider],
    // We need a component here because we cannot define the route otherwise
    component: NotFoundComponent,
  },
  
  { path: "home", component: HomeComponent },
  { path: "recetas", component: RecipeComponent },
  { path: "games", component: JuegosComponent },

  // ADMIN'S ROUTES
  { path: "admin", 
    component: AdminHomeComponent, 
    canActivate: [AdminAuthGuard]},
  {
    path: "admin/ingredient/add",
    component: AddIngredientComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/ingredient",
    component: ListIngredientComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: "admin/ingredient/edit/:id",
    component: EditIngredientComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: "admin/bar/add",
    component: AddBarComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: "admin/bar",
    component: ListBarComponent,
    canActivate: [AdminAuthGuard],

  },
  {
    path: "admin/bar/edit/:id",
    component: EditBarComponent,
    canActivate: [AdminAuthGuard],
  },

  {
    path: "admin/drink",
    component: ListDrinkComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: "admin/drink/add",
    component: AddDrinkComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/drink/edit/:id",
    component: EditDrinkComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/zone",
    component: ListZoneComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/zone/add",
    component: AddZoneComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/zone/edit/:id",
    component: EditZoneComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/game",
    component: ListGameComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/game/add",
    component: AddGameComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/game/edit/:id",
    component: EditGameComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/ad",
    component: ListAdComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/ad/add",
    component: AddAdComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: "admin/ad/edit/:id",
    component: EditAdComponent,
    canActivate: [AdminAuthGuard]
  },


  {
    path: "admin/user",
    component: ListUserComponent,
    canActivate: [AdminAuthGuard]
  },

  {path: "prueba/barra", component: TestBarComponent},

  //Ruta no encontrada
  { path: "**", component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
        provide: externalUrlProvider,
        useValue: (route: ActivatedRouteSnapshot) => {
            
            const externalUrl = route.paramMap.get('externalUrl');
            window.open(externalUrl, '_blank');
        },
    },
  ]
})
export class AppRoutingModule {}
