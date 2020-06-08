import { AdminAuthGuard } from "./guards/adminAuth.guard";
import { AuthGuard } from "./guards/auth.guard";
import { AuthService } from "./services/auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./components/footer/footer.component";
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
import { AdminHeaderComponent } from "./components/admin/admin-header/admin-header.component";
import { AddIngredientComponent } from "./components/admin/ingredient/add-ingredient/add-ingredient.component";
import { ListIngredientComponent } from "./components/admin/ingredient/list-ingredient/list-ingredient.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ValidateService } from "./services/validate.service";
import { EditIngredientComponent } from "./components/admin/ingredient/edit-ingredient/edit-ingredient.component";
import { AddBarComponent } from './components/admin/bar/add-bar/add-bar.component';
import { RequiredFieldComponent } from './components/admin/required-field/required-field.component';

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
    RequiredFieldComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ValidateService, AuthService, AuthGuard, AdminAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
