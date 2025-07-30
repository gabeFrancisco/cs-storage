import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '../../../services/cash-register.service';
import { Component } from '@angular/core';
import { CashRegister } from '../../../../models/CashRegister';

@Component({
  selector: 'app-cash-post-modal',
  standalone: false,
  templateUrl: './cash-post-modal.component.html',
  styleUrl: './cash-post-modal.component.css'
})
export class CashPostModalComponent {
  show = false;

  cashForm!: FormGroup;
  initialValues = null;

  constructor(private cashRegisterService: CashRegisterService) {
    this.cashRegisterService.cashPostModalState$.subscribe((value) => {
      this.show = value
    })

    this.cashForm = new FormGroup({
      description: new FormControl('', Validators.required),
      paymentType: new FormControl(0),
      value: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      createdAt: new FormControl(new Date().toISOString().split('T')[0], Validators.required)
    })

    this.initialValues = this.cashForm.value;
  }

  close() {
    this.cashRegisterService.closeCashPostModal();
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

    this.cashRegisterService.createCashRegister(register).subscribe({
      next: (item) => {
        this.cashForm.reset(this.initialValues);
        this.cashRegisterService.closeCashPostModal();
        this.cashRegisterService.triggerUpdate();
      }
    }
    )
  }
}
