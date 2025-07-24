import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../../services/cash-register.service';
import { DayAndMonthData } from '../../../models/ValueObjects/DayAndMonthData';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  cashRegisterValues!: DayAndMonthData;

  constructor(private cashRegisterService: CashRegisterService) {
    this.cashRegisterService.triggerUpdate();
    this.cashRegisterService.refreshList$.subscribe(() => {
      this.fetchData();
    })
  }
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.cashRegisterService.getDayAndMonthValueData()
    .subscribe((res) => this.cashRegisterValues = res)
  }
}
