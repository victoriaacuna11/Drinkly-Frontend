import { AdminAuthGuard } from "./guards/adminAuth.guard";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";
import { AddIngredientComponent } from "./components/admin/ingredient/add-ingredient/add-ingredient.component";
import { ListIngredientComponent } from "./components/admin/ingredient/list-ingredient/list-ingredient.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile-page/profile/profile.component";
import { ValidateService } from "./services/validate.service";
import { EditIngredientComponent } from "./components/admin/ingredient/edit-ingredient/edit-ingredient.component";
// import { AddBarComponent } from './components/admin/bar/add-bar/add-bar.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { FooterComponent } from './components/footer/footer.component';
// import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
// import { HeaderComponent } from './components/header/header.component';
// import { ListComponent } from './components/list/list.component';
// import { BarsListComponent } from './components/bars/bars-list/bars-list.component';
// import { DrinksListComponent } from './components/drinks/drinks-list/drinks-list.component';
// import { DrinksFilterComponent } from './components/drinks/drinks-filter/drinks-filter.component';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { PruebaComponent } from './components/prueba/prueba.component';
// import { PruebaNewComponent } from './components/prueba-new/prueba-new.component';
// import { HttpClientModule } from '@angular/common/http';
// import { PruebaEditComponent } from './components/prueba-edit/prueba-edit.component';
// import { FilterChildComponent } from './components/drinks/filter-child/filter-child.component';
// import { FilterParentComponent } from './components/drinks/filter-parent/filter-parent.component';
// import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { RequiredFieldComponent } from './components/admin/required-field/required-field.component';
// import { FileUploadFirestorageModule } from 'file-upload-firestorage';
// import { AngularFireModule } from '@angular/fire';
// import { environment } from 'src/environments/environment';
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
import { ListComponent } from "./components/list/list.component";
import { BarsListComponent } from "./components/bars/bars-list/bars-list.component";
import { DrinksListComponent } from "./components/drinks/drinks-list/drinks-list.component";
import { DrinksFilterComponent } from "./components/drinks/drinks-filter/drinks-filter.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PruebaComponent } from "./components/prueba/prueba.component";
import { PruebaNewComponent } from "./components/prueba-new/prueba-new.component";
import { HttpClientModule } from "@angular/common/http";
import { PruebaEditComponent } from "./components/prueba-edit/prueba-edit.component";
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
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { AgeValidatorDirective } from "./Directives/isAdult.directive";
import { ListUserComponent } from './components/admin/user/list-user/list-user.component';
import { EditUserComponent } from './components/profile-page/edit-user/edit-user.component';
import { DetailBarComponent } from './components/bars/detail-bar/detail-bar.component';
import { ExternalUrlDirective } from './Directives/external-url.directive';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ListComponent,
    BarsListComponent,
    DrinksListComponent,
    DrinksFilterComponent,
    PruebaComponent,
    PruebaNewComponent,
    PruebaEditComponent,
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
    AgeValidatorDirective,
    ListUserComponent,
    EditUserComponent,
    DetailBarComponent,
    ExternalUrlDirective,
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
  ],
  providers: [ValidateService, AuthService, AuthGuard, AdminAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
