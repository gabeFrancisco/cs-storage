import { Debt } from './../../../../models/Debt';
import { Customer } from './../../../../models/Customer';
import { Component, OnInit } from '@angular/core';
import { DebtService } from '../../../services/debt.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../../models/Address';
import { ModalType } from '../../../../utils/modalType';

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

  modalType: ModalType | null = null;

  constructor(private debtService: DebtService) {
    this.debtService.debtPostModalState$.subscribe((value) => {
      this.show = value as boolean
    })

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

    this.debtService.debtPostType$.subscribe(value => {
      this.modalType = value;
      // console.log(this.debtForm.value)

      //Verify if the modal type is differente from CREATE
      if (value !== ModalType.CREATE) {

        //Gets the debt id from the service
        this.debtService.debtId$.subscribe(data => {
          if (data) {

            //Fetch the debt by the given id from the server
            //Then patch all the values for the form fields
            this.debtService.getDebtById(data!).subscribe(res => {
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
        })
      }
      else {
        this.debtForm.reset();
      }
    })
  }

  close() {
    this.debtService.closeDebtPostModal();
  }

  submit() {
    if (this.debtForm.invalid) {
      // alert("Há campos inválidos! Por favor, verifique.");
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

    if (this.modalType === ModalType.CREATE) {
      this.debtService.createDebt(this.debt).subscribe({
        next: _ => {
          this.debtForm.reset();
          this.debtService.triggerUpdate();
        },
        error: err => console.log(err)
      })
    }
    else if (this.modalType === ModalType.UPDATE) {
      this.debtService.updateDebt(this.debt).subscribe({
        next: _ => {
          this.debtForm.reset();
          this.debtService.triggerUpdate();
        },
        error: err => console.log(err)
      })
      this.debtService.closeDebtPostModal();
    }
  }
}
