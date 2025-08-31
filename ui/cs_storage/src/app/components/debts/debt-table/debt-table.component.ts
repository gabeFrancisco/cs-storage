import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Debt } from '../../../../models/Debt';
import { DebtService } from '../../../services/debt.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-debt-table',
  standalone: false,
  templateUrl: './debt-table.component.html',
  styleUrl: './debt-table.component.css'
})
export class DebtTableComponent implements OnInit{
  debts: Debt[] = [];

  loading = true;

  constructor(private debtService: DebtService) {

  }
  ngOnInit(): void {
    this.debtService.triggerUpdate();
    this.debtService.refreshList$.subscribe(()=>{
      this.fetchList();
    })
  }

  fetchList() {
    this.debtService.getDebts().subscribe({
      next: (res) => {
        this.debts = res
      }, complete: () => this.loading = false
    })
  }

  openDebtPostModal() {
    this.debtService.openDebtPostModal();
  }

  openDebtUpdate(id: number) {
    this.debtService.setDebtId(id)
    this.debtService.openDebtPostModal();
  }

  deleteDebt(id: number) {
    if (confirm("Tem certeza que deseja remover este débito?")) {
      this.debtService.removeDebt(id).subscribe(() => {
        this.fetchList()
      })
    }
  }
}
