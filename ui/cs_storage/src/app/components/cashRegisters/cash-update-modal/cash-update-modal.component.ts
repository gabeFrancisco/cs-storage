import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '../../../services/cash-register.service';
import { CashRegister } from '../../../../models/CashRegister';

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

  cashRegister: CashRegister | null = null;

  constructor(private cashRegisterService: CashRegisterService) {

    //Gets the modal open/close state from service
    this.cashRegisterService.cashUpdateModalState$.subscribe((value) => {
      this.show = value
    })

    this.cashForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      description: new FormControl("", Validators.required),
      payment_type: new FormControl(0),
      value: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      created_at: new FormControl(null, Validators.required)
    })

    //Gets the cash register ID from the service to load the full cash register entity from DB.
    this.cashRegisterService.cashRegisterId$.subscribe((data) => {
      this.cashRegisterService.getCashRegisterById(data!).subscribe((res) => {
        this.cashForm.patchValue(res)
      })
    });

  }

  //Closes the modal
  close() {
    this.cashRegisterService.closeUpdatePostModal();
  }

  get description() {
    return this.cashForm.get('description')!;
  }

  get value() {
    return this.cashForm.get('value')!;
  }

  get created_at() {
    return this.cashForm.get('created_at')!;
  }

  submit() {
    if (this.cashForm.invalid) {
      alert("Há campos inválidos! Por favor, verifique.");
      return;
    }

    let register = this.cashForm.value as CashRegister;

    this.cashRegisterService.updateCashRegister(register).subscribe({
      next: res => {
        this.cashForm.patchValue(res)
        this.cashRegisterService.triggerUpdate();
        this.cashForm.reset(this.initialValues);
        this.cashRegisterService.closeUpdatePostModal();
      },
      error: err => alert(err)
    })

  }
}
