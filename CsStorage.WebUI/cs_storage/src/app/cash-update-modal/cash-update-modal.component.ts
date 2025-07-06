import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '../cash-register.service';
import { CashRegister } from '../../models/CashRegister';

@Component({
  selector: 'app-cash-update-modal',
  standalone: false,
  templateUrl: './cash-update-modal.component.html',
  styleUrl: './cash-update-modal.component.css'
})
export class CashUpdateModalComponent {
  show = false;

  cashForm!: FormGroup;
  initialValues = null;

  constructor(private cashRegisterService: CashRegisterService) {
    this.cashRegisterService.cashUpdateModalState$.subscribe((value) => {
      this.show = value
    })

    this.cashForm = new FormGroup({
      description: new FormControl('', Validators.required),
      paymentType: new FormControl(0),
      value: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      createdAt: new FormControl(new Date().toISOString().substring(0, 10), Validators.required)
    })

    this.initialValues = this.cashForm.value;
  }

  close() {
    this.cashRegisterService.closeUpdatePostModal();
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

    this.cashRegisterService.createCashRegister(register).subscribe(() => {
      this.cashRegisterService.getCashRegisters();
    })

    this.cashForm.reset(this.initialValues);
    this.cashForm.markAsPristine()
    this.cashForm.markAsUntouched()

    this.cashRegisterService.closeUpdatePostModal();
    this.cashRegisterService.notifyListUpdate();
  }
}
