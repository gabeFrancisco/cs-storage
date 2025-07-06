import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { CashRegisterTableComponent } from './cash-register-table/cash-register-table.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DebtTableComponent } from './debt-table/debt-table.component';
import { CashPostModalComponent } from './cash-post-modal/cash-post-modal.component';
import { NgIconsModule } from '@ng-icons/core'
import { phosphorArrowsClockwiseBold } from '@ng-icons/phosphor-icons/bold'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CashRegisterTableComponent,
    DebtTableComponent,
    CashPostModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({phosphorArrowsClockwiseBold})
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
