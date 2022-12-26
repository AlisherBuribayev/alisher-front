import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { BasketComponent } from './pages/basket/basket.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ToastService, AngularToastifyModule } from 'angular-toastify';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { ListComponent } from './pages/list/list.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    routingComponents,
    HomeComponent,
    BasketComponent,
    FavoritesComponent,
    ProductComponent,
    LoginComponent,
    ListComponent,
    CategoryComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularToastifyModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
