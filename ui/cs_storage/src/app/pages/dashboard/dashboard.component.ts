import { Component } from '@angular/core';
import { CashRegisterService } from '../../services/cash-register.service';
import { DebtService } from '../../services/debt.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    public cashRegisterService: CashRegisterService,
    public debtService: DebtService
  ) { }
}
