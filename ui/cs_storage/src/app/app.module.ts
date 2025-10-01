import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CashRegisterTableComponent } from './components/cashRegisters/cash-register-table/cash-register-table.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashPostModalComponent } from './components/cashRegisters/cash-post-modal/cash-post-modal.component';
import { CashUpdateModalComponent } from './components/cashRegisters/cash-update-modal/cash-update-modal.component';
import { DebtPostModalComponent } from './components/debts/debt-post-modal/debt-post-modal.component'
import { DebtTableComponent } from './components/debts/debt-table/debt-table.component';
import { MissingProductsComponent } from './pages/missing-products/missing-products.component';
import { RouterModule } from '@angular/router';
import { MissingProductsTableComponent } from './components/missingProducts/missing-products-table/missing-products-table.component';
import { MissingProductsModalComponent } from './components/missingProducts/missing-products-modal/missing-products-modal.component';
import { DebtUpdateModalComponent } from './components/debts/debt-update-modal/debt-update-modal.component';
import { ServiceOrderTableComponent } from './components/serviceOrders/service-order-table/service-order-table.component';
import { ServiceOrdersComponent } from './pages/service-orders/service-orders.component';
import { ServiceOrderCreateComponent } from './pages/service-order-create/service-order-create.component';
import { ServiceOrderUpdateComponent } from './pages/service-order-update/service-order-update.component';
import { authInterceptor } from '../utils/interceptor';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { NgClickOutsideDirective} from 'ng-click-outside2';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CashRegisterTableComponent,
    DebtTableComponent,
    CashPostModalComponent,
    CashUpdateModalComponent,
    DebtPostModalComponent,
    MissingProductsComponent,
    MissingProductsTableComponent,
    MissingProductsModalComponent,
    DebtUpdateModalComponent,
    ServiceOrderTableComponent,
    ServiceOrdersComponent,
    ServiceOrderCreateComponent,
    ServiceOrderUpdateComponent,
    LoginComponent,
    DashboardComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgClickOutsideDirective
  ],
  providers: [provideHttpClient(),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
