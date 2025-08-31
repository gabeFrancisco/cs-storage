import { DebtService } from './../../../services/debt.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Debt } from '../../../../models/Debt';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-debt-update-modal',
  standalone: false,
  templateUrl: './debt-update-modal.component.html',
  styleUrl: './debt-update-modal.component.css'
})
export class DebtUpdateModalComponent implements OnInit {
  show = false;

  debtForm!: FormGroup;

  debt!: Debt;

  constructor(private debtService: DebtService) {
    this.debtService.debtUpdateModalState$.subscribe((value) => {
      this.show = value
    })
  }
  ngOnInit(): void {
    this.debtForm = new FormGroup({
      id: new FormControl(0),
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


    this.debtService.debtId$.pipe(
      filter(id => !!id),
      switchMap(id => this.debtService.getDebtById(id!))
    )
      .subscribe(res => {
        this.debtForm.patchValue({
          id: res.id!,
          value: res.value,
          forecast: res.forecast,
          name: res.customer.name,
          phone: res.customer.phone,
          cpf_cnpj: res.customer.cpf_cnpj,
          road: res.customer.address?.road,
          number: res.customer.address?.number,
          complement: res.customer.address?.complement,
          neighborhood: res.customer.address?.neighborhood,
          city: res.customer.address?.city,
          state: res.customer.address?.state
        })
      })
  }

  close() {
    this.debtForm.reset();
    this.debtService.setDebtId(0);
    this.debtService.closeDebtUpdateModal();
  }

  submit() {
    if (this.debtForm.invalid) {
      alert("Há campos inválidos! Por favor, verifique.");
      return;
    }

    this.debt = {
      id: this.debtForm.get('id')!.value! ?? 0,
      forecast: this.debtForm.get('forecast')!.value ?? "",
      paid_date: new Date().toISOString(),
      value: this.debtForm.get('value')!.value ?? "",
      created_at: new Date().toISOString(),
      customer: {
        name: this.debtForm.get('name')!.value ?? "",
        phone: this.debtForm.get('phone')!.value ?? "",
        cpf_cnpj: this.debtForm.get('cpf_cnpj')!.value ?? "",
        address: {
          road: this.debtForm.get('road')!.value ?? "",
          number: this.debtForm.get('number')!.value ?? "",
          complement: this.debtForm.get('complement')!.value ?? "",
          neighborhood: this.debtForm.get('neighborhood')!.value ?? "",
          city: this.debtForm.get('city')!.value ?? "",
          state: this.debtForm.get('state')!.value ?? ""
        }
      }
    }

    this.debtService.updateDebt(this.debt).subscribe({
      next: _ => {
        this.debtForm.reset();
        this.debtService.triggerUpdate();
        this.debtService.closeDebtUpdateModal();
      },
      error: err => console.log(err)
    })
  }
}
