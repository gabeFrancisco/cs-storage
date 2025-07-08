import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '../services/cash-register.service';
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

  cashRegister: CashRegister | null = null;

  constructor(private cashRegisterService: CashRegisterService) {

    //Gets the modal open/close state from service
    this.cashRegisterService.cashUpdateModalState$.subscribe((value) => {
      this.show = value
    })

    this.cashForm = new FormGroup({
      description: new FormControl("", Validators.required),
      paymentType: new FormControl(0),
      value: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      createdAt: new FormControl(new Date().toISOString().substring(0, 10), Validators.required)
    })

    //Gets the cash register ID from the service to load the full cash register entity from DB.
    this.cashRegisterService.cashRegisterId$.subscribe((data) => {
      this.cashRegisterService.getCashRegisterById(data!).subscribe((res) => this.cashForm.patchValue(res))
    });

    this.initialValues = this.cashForm.value;
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

    this.cashRegisterService.closeUpdatePostModal();
    this.cashRegisterService.notifyListUpdate();
  }
}
