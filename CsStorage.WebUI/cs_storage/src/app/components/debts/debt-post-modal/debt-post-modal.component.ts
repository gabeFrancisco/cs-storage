import { Debt } from './../../../../models/Debt';
import { Customer } from './../../../../models/Customer';
import { Component } from '@angular/core';
import { DebtService } from '../../../services/debt.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../../models/Address';

@Component({
  selector: 'app-debt-post-modal',
  standalone: false,
  templateUrl: './debt-post-modal.component.html',
  styleUrl: './debt-post-modal.component.css'
})
export class DebtPostModalComponent {
  show = false;

  debtForm!: FormGroup;

  debt!: Debt;

  constructor(private debtService: DebtService) {
    this.debtService.debtPostModalState$.subscribe((value) => {
      this.show = value
    })

    this.debtForm = new FormGroup({
      value: new FormControl(0, Validators.min(0.1)),
      forecast: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
      name: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      cpf_cnpj: new FormControl(" "),
      road: new FormControl(" "),
      number: new FormControl(" "),
      complement: new FormControl(" "),
      neighborhood: new FormControl(" "),
      city: new FormControl(" "),
      state: new FormControl(" ")
    })
  }

  close(){
    this.debtService.closeDebtPostModal();
  }

  submit() {
    if(this.debtForm.invalid){
      alert("Há campos inválidos! Por favor, verifique.");
      console.log(this.debtForm)
      return;
    }

    this.debt = {
      forecast:  this.debtForm.get('forecast')!.value,
      paidDate: new Date().toISOString(),
      value: this.debtForm.get('value')!.value,
      createdAt: new Date().toISOString(),
      customer: {
        name: this.debtForm.get('name')!.value,
        phone: this.debtForm.get('phone')!.value,
        cpf_cnpj: this.debtForm.get('cpf_cnpj')!.value,
        address: {
          road: this.debtForm.get('road')!.value,
          number: this.debtForm.get('number')!.value,
          complement: this.debtForm.get('complement')!.value,
          neighborhood: this.debtForm.get('neighborhood')!.value,
          city: this.debtForm.get('city')!.value,
          state: this.debtForm.get('state')!.value
        }
      }
    }

    this.debtService.createDebt(this.debt).subscribe({
      next: res => {
        this.debtForm.reset();
        this.debtService.notifyListUpdate();
        this.debtService.closeDebtPostModal();
      },
      error: err => console.log(err)
    })
  }
}
