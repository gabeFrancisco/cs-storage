import { Component } from '@angular/core';
import { DebtService } from '../../../services/debt.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-debt-post-modal',
  standalone: false,
  templateUrl: './debt-post-modal.component.html',
  styleUrl: './debt-post-modal.component.css'
})
export class DebtPostModalComponent {
  show = false;

  debtForm!: FormGroup;

  constructor(private debtService: DebtService) {
    this.debtService.debtPostModalState$.subscribe((value) => {
      this.show = value
    })

    this.debtForm = new FormGroup({
      value: new FormControl(0, Validators.min(0.1)),
      forecast: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
      name: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      cpf_cnpj: new FormControl(""),
      road: new FormControl(""),
      number: new FormControl(""),
      complement: new FormControl(""),
      neighborhood: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl("")
    })
  }

  close() {
    this.debtService.closeDebtPostModal();
  }

  submit() {

  }
}
