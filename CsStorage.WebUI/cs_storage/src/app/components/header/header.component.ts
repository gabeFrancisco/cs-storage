import { Component } from '@angular/core';
import { CashRegisterService } from '../../services/cash-register.service';
import { DayAndMonthData } from '../../../models/ValueObjects/DayAndMonthData';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cashRegisterValues!: DayAndMonthData;

  constructor(private cashRegisterService: CashRegisterService) {
    this.cashRegisterService.getDayAndMonthValueData()
      .subscribe((res) => this.cashRegisterValues = res)
  }
}
