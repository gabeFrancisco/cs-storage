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
  initialValues = null;
  constructor(private cashService: CashRegisterService) { }

  ngOnInit(): void {

    this.fetchList();

    this.cashForm = new FormGroup({
      description: new FormControl('', Validators.required),
      paymentType: new FormControl(0),
      value: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      createdAt: new FormControl(new Date().toISOString().substring(0, 10), Validators.required)
    })

    this.initialValues = this.cashForm.value;
  }

  fetchList() {
    this.cashService.getCashRegisters().subscribe((res) => {
      this.registers = res
    })
  }

  get description() {
    return this.cashForm.get('description')!;
  }

  get value() {
    return this.cashForm.get('value')!;
  }

  get createdAt() {
    return this.cashForm.get('createdAt')!;
  }

  submit() {
    let register = this.cashForm.value as CashRegister;

    if (this.cashForm.invalid) {
      return;
    }

    this.cashService.createCashRegister(register).subscribe(() => {
      this.fetchList();
    })

    this.cashForm.reset(this.initialValues);
    this.cashForm.markAsPristine()
    this.cashForm.markAsUntouched()
  }
}
