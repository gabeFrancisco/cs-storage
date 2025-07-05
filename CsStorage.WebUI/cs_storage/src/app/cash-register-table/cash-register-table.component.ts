import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../cash-register.service';
import { CashRegister } from '../../models/CashRegister';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cash-register-table',
  standalone: false,
  templateUrl: './cash-register-table.component.html',
  styleUrl: './cash-register-table.component.css'
})
export class CashRegisterTableComponent implements OnInit {
  registers: CashRegister[] = [];

  cashForm!: FormGroup;

  constructor(private cashService: CashRegisterService) { }

  ngOnInit(): void {
    this.cashService.getCashRegisters().subscribe((res) => {
      this.registers = res
    })

    this.cashForm = new FormGroup({
      description: new FormControl('', Validators.required),
      paymentType: new FormControl('cash'),
      value: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      date: new FormControl(new Date().toISOString().substring(0, 10), Validators.required)
    })
  }

  get description(){
    return this.cashForm.get('description')!;
  }

  get value(){
    return this.cashForm.get('value')!;
  }

  get date(){
    return this.cashForm.get('date')!;
  }

  submit(){
    console.log(this.cashForm.value);
  }
}
