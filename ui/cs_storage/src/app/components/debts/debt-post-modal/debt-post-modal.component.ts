import { Debt } from './../../../../models/Debt';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DebtService } from '../../../services/debt.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalType } from '../../../../utils/modalType';
import { filter, first, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { FormMode } from '../../../../models/types/FormMode';
import { nowDateToString } from '../../../../utils/dateHandler';

@Component({
  selector: 'app-debt-post-modal',
  standalone: false,
  templateUrl: './debt-post-modal.component.html',
  styleUrl: './debt-post-modal.component.css'
})
export class DebtPostModalComponent implements OnInit, OnDestroy {
  show = false;
  mode: FormMode = 'read';

  get readOnly() {
    return this.mode === 'read'
  }

  private destroy$ = new Subject<void>();

  debtForm = new FormGroup({
    id: new FormControl(0),
    value: new FormControl<number>(0, Validators.min(0.1)),
    forecast: new FormControl(nowDateToString(), Validators.required),
    customer: new FormGroup({
      name: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
      cpf_cnpj: new FormControl(" "),
    }),

    road: new FormControl(" "),
    number: new FormControl(" "),
    complement: new FormControl(" "),
    neighborhood: new FormControl(" "),
    city: new FormControl(" "),
    state: new FormControl(" ")
  })

  debt!: Debt;

  constructor(private debtService: DebtService) { }


  ngOnInit(): void {
    this.watchModalState();
    this.watchModalType();
    this.watchCreateMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close() {
    this.debtForm.reset();
    this.debtService.setDebtId(0);
    this.debtService.closeDebtModal();
  }

  submit() {
    if (this.mode === 'read') {
      this.debtService.setDebtModalType('update');
      return;
    }

    if (this.debtForm.invalid) {
      return;
    }

    const debt = this.debtForm.value as Debt;
    const request$ =
      this.mode === 'create'
        ? this.debtService.createDebt({ ...debt, id: undefined })
        : this.debtService.updateDebt(debt)

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.onSuccess()
    })

    // this.debt = {
    //   id: this.debtForm.get('id')!.value! ?? 0,
    //   forecast: this.debtForm.get('forecast')!.value ?? "",
    //   paid_date: new Date().toISOString(),
    //   value: this.debtForm.get('value')!.value ?? "",
    //   created_at: new Date().toISOString(),
    //   customer: {
    //     name: this.debtForm.get('name')!.value ?? "",
    //     phone: this.debtForm.get('phone')!.value ?? "",
    //     cpf_cnpj: this.debtForm.get('cpf_cnpj')!.value ?? "",
    //     address: {
    //       road: this.debtForm.get('road')!.value ?? "",
    //       number: this.debtForm.get('number')!.value ?? "",
    //       complement: this.debtForm.get('complement')!.value ?? "",
    //       neighborhood: this.debtForm.get('neighborhood')!.value ?? "",
    //       city: this.debtForm.get('city')!.value ?? "",
    //       state: this.debtForm.get('state')!.value ?? ""
    //     }
    //   }
    // }

    this.debtService.createDebt(this.debt).subscribe({
      next: _ => {
        this.debtForm.reset();
        this.debtService.triggerUpdate();
      },
      error: err => console.log(err)
    })
  }

  private watchModalState() {
    this.debtService.debtModalState$.subscribe((value) => {
      this.show = value as boolean
    })
  }

  private watchModalType() {
    this.debtService.modalType$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.mode = value as FormMode
      })
  }

  private watchCreateMode() {
    this.debtService.modalType$
      .pipe(
        takeUntil(this.destroy$),
        filter(mode => mode === 'create')
      )
      .subscribe(() => {
        this.resetForm()
      })
  }

  private resetForm() {
    this.debtForm.reset({
      id: 0,
      value: 0,
      forecast: "",
      customer: {
        name: "",
        phone: "",
        cpf_cnpj: ""
      },
      road: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: ""
    });
  }

  private onSuccess() {
    this.resetForm();
    this.debtService.closeDebtModal();
    this.debtService.triggerUpdate();
  }
}
