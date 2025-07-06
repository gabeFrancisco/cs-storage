import { Component, OnInit } from '@angular/core';
import { Debt } from '../../models/Debt';
import { DebtService } from '../debt.service';

@Component({
  selector: 'app-debt-table',
  standalone: false,
  templateUrl: './debt-table.component.html',
  styleUrl: './debt-table.component.css'
})
export class DebtTableComponent implements OnInit{
  debts: Debt[] = [];

  constructor(private debtService: DebtService) { }

  ngOnInit(): void {
    this.fetchList();
  }

  fetchList(){
    this.debtService.getDebts().subscribe((res) => {
      this.debts = res;
    })
  }
}
