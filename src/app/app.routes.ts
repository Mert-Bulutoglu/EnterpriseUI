import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import {AuthGuard} from './auth.guard';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "product-list",
    component: ProductListComponent,
    canActivate: [AuthGuard]
  }
];
