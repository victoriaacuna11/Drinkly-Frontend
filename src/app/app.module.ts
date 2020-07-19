import { passwordValidator } from './Directives/password.directive';
import { AdminAuthGuard } from "./guards/adminAuth.guard";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";
import { AddIngredientComponent } from "./components/admin/ingredient/add-ingredient/add-ingredient.component";
import { ListIngredientComponent } from "./components/admin/ingredient/list-ingredient/list-ingredient.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile-page/profile/profile.component";
import { EditIngredientComponent } from "./components/admin/ingredient/edit-ingredient/edit-ingredient.component";
import { ListBarComponent } from './components/admin/bar/list-bar/list-bar.component';
import { EditBarComponent } from './components/admin/bar/edit-bar/edit-bar.component';
import { AddBarComponent } from "./components/admin/bar/add-bar/add-bar.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AdminHeaderComponent } from "./components/admin/admin-header/admin-header.component";
import { HeaderComponent } from "./components/header/header.component";
import { BarsListComponent } from "./components/bars/bars-list/bars-list.component";
import { DrinksListComponent } from "./components/drinks/drinks-list/drinks-list.component";
import { DrinksFilterComponent } from "./components/drinks/drinks-filter/drinks-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { FilterChildComponent } from "./components/drinks/filter-child/filter-child.component";
import { FilterParentComponent } from "./components/drinks/filter-parent/filter-parent.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RequiredFieldComponent } from "./components/admin/required-field/required-field.component";
import { FileUploadFirestorageModule } from "file-upload-firestorage";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { ListDrinkComponent } from "./components/admin/drink/list-drink/list-drink.component";
import { AddDrinkComponent } from "./components/admin/drink/add-drink/add-drink.component";
import { EditDrinkComponent } from "./components/admin/drink/edit-drink/edit-drink.component";
import { JuegosComponent } from './components/juegos/juegos.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AgeValidatorDirective } from "./Directives/isAdult.directive";
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';
import { EditUserComponent } from './components/profile-page/edit-user/edit-user.component';
import { AddZoneComponent } from './components/admin/zone/add-zone/add-zone.component';
import { EditZoneComponent } from './components/admin/zone/edit-zone/edit-zone.component';
import { ListZoneComponent } from './components/admin/zone/list-zone/list-zone.component';
import { EditGameComponent } from './components/admin/game/edit-game/edit-game.component';
import { ListGameComponent } from './components/admin/game/list-game/list-game.component';
import { ShowFilterComponent } from './components/drinks/show-filter/show-filter.component';
import { DetailBarComponent } from './components/bars/detail-bar/detail-bar.component';
import { ExternalUrlDirective } from './Directives/external-url.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListAdComponent } from './components/admin/ad/list-ad/list-ad.component';
import { AddAdComponent } from './components/admin/ad/add-ad/add-ad.component';
import { EditAdComponent } from './components/admin/ad/edit-ad/edit-ad.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { TestBarComponent } from './components/test-bar/test-bar.component';
import { PostDrinkComponent } from './components/post-drink/post-drink.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FilterPipe } from './pipes/filter.pipe';
import { clickedOutDirective } from './Directives/dropdown.directive';
import { UploadingLoaderComponent } from './components/uploading-loader/uploading-loader.component';
import { PostBusinessComponent } from './components/post-business/post-business.component';
import { DrinklyTeamComponent } from './components/drinkly-team/drinkly-team.component';
import { ServiceWorkerModule } from '@angular/service-worker';
  import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    BarsListComponent,
    DrinksListComponent,
    DrinksFilterComponent,
    AdminHeaderComponent,
    AddIngredientComponent,
    ListIngredientComponent,
    EditIngredientComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AddBarComponent,
    FilterChildComponent,
    FilterParentComponent,
    NotFoundComponent,
    SidebarComponent,
    RequiredFieldComponent,
    ListBarComponent,
    EditBarComponent,
    ListDrinkComponent,
    AddDrinkComponent,
    EditDrinkComponent,
    JuegosComponent,
    AgeValidatorDirective,
    ListUserComponent,
    EditUserComponent,
    AddZoneComponent,
    EditZoneComponent,
    ListZoneComponent,
    EditGameComponent,
    ListGameComponent,
    ShowFilterComponent,
    DetailBarComponent,
    ExternalUrlDirective,
    NavbarComponent,
    ListAdComponent,
    AddAdComponent,
    EditAdComponent,
    RecipeComponent,
    HomeComponent,
    AdminHomeComponent,
    TestBarComponent,
    PostDrinkComponent,
    LoaderComponent,
    FilterPipe,
    clickedOutDirective,
    UploadingLoaderComponent,
    PostBusinessComponent,
    DrinklyTeamComponent,
    passwordValidator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FileUploadFirestorageModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    
  ],
  providers: [AuthService, AuthGuard, AdminAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
