import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './components/list/list.component';
import { BarsListComponent } from './components/bars/bars-list/bars-list.component';
import { DrinksListComponent } from './components/drinks/drinks-list/drinks-list.component';
import { DrinksFilterComponent } from './components/drinks/drinks-filter/drinks-filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PruebaComponent } from './components/prueba/prueba.component';
import { PruebaNewComponent } from './components/prueba-new/prueba-new.component';
import { HttpClientModule } from '@angular/common/http';
import { PruebaEditComponent } from './components/prueba-edit/prueba-edit.component';
import { FilterChildComponent } from './components/drinks/filter-child/filter-child.component';
import { FilterParentComponent } from './components/drinks/filter-parent/filter-parent.component';


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
    FilterChildComponent,
    FilterParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
