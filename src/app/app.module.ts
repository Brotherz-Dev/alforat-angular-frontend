import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, MAT_DATE_LOCALE, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ParentProfileComponent } from './account/parent-profile/parent-profile.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { LoginComponent } from './guest/login/login.component';
import { RegisterComponent } from './guest/register/register.component';
import { MaterialModule } from './shared/material.module';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { AuthenticationLayoutComponent } from './guest/authentication-layout/authentication-layout.component';
import { ResetPasswordComponent } from './guest/reset-password/reset-password.component';
import { ErrorInterceptor } from './services/auth/error-interceptor/error-interceptor';
import { HttpRequestInterceptor } from './services/auth/token-incpector/http-interceptor';
import { ProductTypesComponent } from './product-types/product-types.component';
import { ProductsTableComponent } from './products/products-table/products-table.component';
import { ProductTypesTableComponent } from './product-types/product-types-table/product-types-table.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { UpdateProductTypeComponent } from './product-types/update-product-type/update-product-type.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AddProductTypeComponent } from './product-types/add-product-type/add-product-type.component';
import { StartSaleComponent } from './start-sale/start-sale.component';
import { StartSaleTableComponent } from './start-sale/start-sale-table/start-sale-table.component';
import { SaleComponent } from './sale/sale.component';
import { SalesTableComponent } from './sale/sales-table/sales-table.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductTypesComponent,
    SaleComponent,
    SalesTableComponent,
    UpdateProductComponent,
    UpdateProductTypeComponent,
    AddProductComponent,
    AddProductTypeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardHomeComponent,
    ProductsTableComponent,
    ProductTypesTableComponent,
    DashboardLayoutComponent,
    ParentProfileComponent,
    ProfileComponent,
    StartSaleComponent,
    StartSaleTableComponent,
    AuthenticationLayoutComponent,
    ResetPasswordComponent,
    ProductsComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    NoopAnimationsModule,
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'he-IL' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'ILS' },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
