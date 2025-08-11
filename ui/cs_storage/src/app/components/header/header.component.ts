import { DebtService } from './../../services/debt.service';
import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../../services/cash-register.service';
import { DayAndMonthData } from '../../../models/ValueObjects/DayAndMonthData';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cashRegisterValues!: DayAndMonthData;
  debtValues!: DayAndMonthData;

  constructor(private cashRegisterService: CashRegisterService, private debtService: DebtService) {
    this.cashRegisterService.triggerUpdate();
    this.cashRegisterService.refreshList$.subscribe(() => {
      this.fetchData();
    })

    this.debtService.triggerUpdate();
    this.debtService.refreshList$.subscribe(() => {
      this.fetchData();
    })
  }
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.cashRegisterService.getDayAndMonthValueData()
      .subscribe((res) => this.cashRegisterValues = res)

    this.debtService.getDayAndMonthValueData()
      .subscribe((res) => this.debtValues = res)
  }
}
