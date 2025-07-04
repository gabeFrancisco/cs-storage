import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../cash-register.service';

@Component({
  selector: 'app-cash-register-table',
  standalone: false,
  templateUrl: './cash-register-table.component.html',
  styleUrl: './cash-register-table.component.css'
})
export class CashRegisterTableComponent implements OnInit {
  /**
   *
   */
  constructor(private cashService: CashRegisterService) {

  }
  ngOnInit(): void {
    this.cashService.getCashRegisters().subscribe((registers) => {
      console.log(registers)
    })
  }

}
