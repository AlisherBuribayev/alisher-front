import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {BasketComponent} from "./pages/basket/basket.component";
import {FavoritesComponent} from "./pages/favorites/favorites.component";
import {ProductComponent} from "./pages/product/product.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {ListComponent} from "./pages/list/list.component";
import {CategoryComponent} from "./pages/category/category.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'basket', component: BasketComponent, canActivate: [AuthGuardService]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'product/:id', component: ProductComponent, canActivate: [AuthGuardService]},
  {path: 'list/:query', component: ListComponent, canActivate: [AuthGuardService]},
  {path: 'category/:id', component: CategoryComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = []
