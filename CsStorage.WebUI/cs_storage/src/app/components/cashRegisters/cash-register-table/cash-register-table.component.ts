import { PaymentTypesDictionary } from '../../../../utils/PaymentTypesDictionary';
import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../../../services/cash-register.service';
import { CashRegister } from '../../../../models/CashRegister';

@Component({
  selector: 'app-cash-register-table',
  standalone: false,
  templateUrl: './cash-register-table.component.html',
  styleUrl: './cash-register-table.component.css'
})
export class CashRegisterTableComponent implements OnInit {
  registers: CashRegister[] = [];
  paymentTypes = PaymentTypesDictionary

  constructor(private cashService: CashRegisterService) { }

  ngOnInit(): void {
    this.fetchList();
    this.cashService.notifyListUpdate();
    this.cashService.updateList$.subscribe(() => {
      this.fetchList();
    })
  }

  fetchList() {
    this.cashService.getCashRegisters().subscribe((res) => {
      this.registers = res
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

  openCashUpdateModal(id: number){
    this.cashService.openCashUpdateModal(id);
  }
}
