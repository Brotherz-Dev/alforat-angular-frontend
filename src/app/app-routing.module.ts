import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentProfileComponent } from './account/parent-profile/parent-profile.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { GuestGuard } from './guards/guest/guest.guard';
import { AuthenticationLayoutComponent } from './guest/authentication-layout/authentication-layout.component';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { ResetPasswordComponent } from './guest/reset-password/reset-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductTypesComponent } from './product-types/product-types.component';
import { ProductsComponent } from './products/products.component';
import { SaleComponent } from './sale/sale.component';
import { StartSaleComponent } from './start-sale/start-sale.component';



const routes: Routes = [
  {
    path: 'auth', component: AuthenticationLayoutComponent, canActivate: [GuestGuard], children: [
      { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
      { path: 'resetpassword', component: ResetPasswordComponent, canActivate: [GuestGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: 'startSale', component: StartSaleComponent, canActivate: [AuthGuard] },

  {
    path: 'app', component: DashboardLayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardHomeComponent, canActivate: [AuthGuard] },
      { path: 'profile', component: ParentProfileComponent, canActivate: [AuthGuard] },
      { path: 'sales', component: SaleComponent, canActivate: [AuthGuard] },
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
      //{ path: 'products/update/:id', component: UpdateProductComponent,canActivate: [AuthGuard]},
      { path: 'productTypes', component: ProductTypesComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: "**" , component: PageNotFoundComponent },
  { path: 'page-not-found', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }
