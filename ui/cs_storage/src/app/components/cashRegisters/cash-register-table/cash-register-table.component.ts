import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../../../services/cash-register.service';
import { CashRegister } from '../../../../models/CashRegister';
import { PaymentTypeDictionary } from '../../../../utils/paymentTypesDictionary';

@Component({
  selector: 'app-cash-register-table',
  standalone: false,
  templateUrl: './cash-register-table.component.html',
  styleUrl: './cash-register-table.component.css'
})
export class CashRegisterTableComponent implements OnInit {
  registers: CashRegister[] = [];
  payment_types = PaymentTypeDictionary

  loading = true;

  constructor(private cashService: CashRegisterService) {

  }
  ngOnInit(): void {
    this.cashService.triggerUpdate();
    this.cashService.refreshList$.subscribe(() => {
      this.fetchList();
    })
  }

  fetchList() {
    this.cashService.getCashRegisters().subscribe({
      next: res => {
        this.registers = res
      }, complete: () => this.loading = false
    })
  }

  deleteCashRegister(id: number) {
    if (confirm("Tem certeza que deseja remover esse registro?")) {
      this.cashService.removeCashRegister(id).subscribe(() => {
        this.fetchList();
      });
    }
  }

  openCashPostModal() {
    this.cashService.openCashPostModal();
  }

  openCashUpdateModal(id: number) {
    this.cashService.openCashUpdateModal(id);
  }

  getTime() {
    return new Date().toLocaleTimeString();
  }
}
