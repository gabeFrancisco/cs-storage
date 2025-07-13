import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CashRegisterTableComponent } from './components/cashRegisters/cash-register-table/cash-register-table.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CashPostModalComponent } from './components/cashRegisters/cash-post-modal/cash-post-modal.component';
import { CashUpdateModalComponent } from './components/cashRegisters/cash-update-modal/cash-update-modal.component';
import { DebtPostModalComponent } from './components/debts/debt-post-modal/debt-post-modal.component'
import { DebtTableComponent } from './components/debts/debt-table/debt-table.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
