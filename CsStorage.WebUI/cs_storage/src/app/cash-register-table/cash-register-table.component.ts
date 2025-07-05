import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../cash-register.service';
import { CashRegister } from '../../models/CashRegister';

@Component({
  selector: 'app-cash-register-table',
  standalone: false,
  templateUrl: './cash-register-table.component.html',
  styleUrl: './cash-register-table.component.css'
})
export class CashRegisterTableComponent implements OnInit {
  registers: CashRegister[] = [];

  constructor(private cashService: CashRegisterService) { }

  ngOnInit(): void {
    this.cashService.getCashRegisters().subscribe((res) => {
      this.registers = res
    })
  }
}
