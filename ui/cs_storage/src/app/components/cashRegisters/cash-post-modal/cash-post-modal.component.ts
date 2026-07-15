import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '../../../services/cash-register.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashRegister } from '../../../../models/CashRegister';
import { Product } from '../../../../models/Product';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, filter, Subject, switchMap, takeUntil } from 'rxjs';
import { FormMode } from '../../../../models/types/FormMode'
import { PaymentType } from '../../../../models/enums/PaymentType';
import { nowDateToString, sanitizedDateToString } from '../../../../utils/dateHandler';

@Component({
  selector: 'app-cash-post-modal',
  standalone: false,
  templateUrl: './cash-post-modal.component.html',
  styleUrl: './cash-post-modal.component.css'
})
export class CashPostModalComponent implements OnInit, OnDestroy {
  //Icons
  faUp = faMagnifyingGlass;

  show = false;
  mode: FormMode = 'read';

  //if the FormMode is setted to 'read', some inputs and buttons will be setted
  //as readonly
  get readOnly() {
    return this.mode === 'read'
  }

  private destroy$ = new Subject<void>();

  cashForm = new FormGroup({
    id: new FormControl(0),
    product_id: new FormControl(-1, Validators.required),
    quantity: new FormControl(1, Validators.required),
    payment_type: new FormControl({ value: 0, disabled: this.readOnly }),
    value: new FormControl(0, [Validators.min(0.1)]),
    created_at: new FormControl(nowDateToString(), Validators.required)
  })

  product?: Product;
  productData = "";

  constructor(private cashRegisterService: CashRegisterService) { }

  ngOnInit(): void {

    this.watchModalState();
    this.watchModalType();
    this.watchSelectedRegister();
    this.watchCreateMode();
    this.watchSelectedProduct();
    this.watchQuantity();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  private recalculateValue() {
    if (!this.product) return;
    const quantity = this.cashForm.get('quantity')!.value;
    this.cashForm.get('value')!.patchValue(quantity! * this.product!.price)
  }

  openProductModal() {
    this.cashRegisterService.openCashProductModal();
  }

  close() {
    this.cashRegisterService.closeCashModal();
  }

  get product_id() {
    return this.cashForm.get('product_id')!;
  }

  get quantity() {
    return this.cashForm.get('quantity')!;
  }

  get value() {
    return this.cashForm.get('value')!;
  }

  get created_at() {
    return this.cashForm.get('created_at')!;
  }

  submit() {
    if (this.mode === 'read') {
      this.cashRegisterService.setCashModalType('update');
      return;
    }

    if (this.cashForm.invalid) {
      return;
    }

    const cashRegister = this.cashForm.value as CashRegister;
    const request$ =
      this.mode === 'create'
        ? this.cashRegisterService.createCashRegister({ ...cashRegister, id: undefined })
        : this.cashRegisterService.updateCashRegister(cashRegister);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.onSuccess()
    })
  }

  private onSuccess() {
    this.resetForm();
    this.cashRegisterService.closeCashModal();
    this.cashRegisterService.triggerUpdate();
  }

  private resetForm() {
    this.cashForm.reset({
      product_id: 0,
      quantity: 1,
      payment_type: PaymentType.Cash,
      value: 0,
      created_at: new Date().toISOString().split('T')[0]
    })
  }

  private watchModalState() {
    //Set the form show property
    this.cashRegisterService.cashPostModalState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.show = value
      })
  }

  private watchModalType() {
    //Set the modal type
    this.cashRegisterService.modalType$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.mode = value as FormMode

        const paymentType = this.cashForm.get('payment_type')

        if (this.readOnly) {
          paymentType?.disable();
        }
        else {
          paymentType?.enable()
        }
      })
  }

  private watchSelectedRegister() {
    //This rxjs operators fires when at least one of the objects in the array changes
    combineLatest([
      this.cashRegisterService.cashRegisterId$,
      this.cashRegisterService.modalType$
    ])
      .pipe(
        takeUntil(this.destroy$),

        //Checks if the mode is different than 'create'
        filter(([id, mode]) => !!id && mode !== 'create'),
        switchMap(([id]) => this.cashRegisterService.getCachedRegisterById(id!))
      )
      .subscribe(cash => {
        if (cash) {
          this.cashForm.patchValue(cash)
          this.created_at.patchValue(sanitizedDateToString(cash.created_at!))
          this.cashRegisterService.selectProduct(cash.product)
        }
      })
  }

  private watchCreateMode() {
    this.cashRegisterService.modalType$
      .pipe(
        takeUntil(this.destroy$),
        filter(mode => mode === 'create')
      )
      .subscribe(() => {
        this.resetForm()
        this.cashRegisterService.selectProduct(undefined!)
      })
  }

  private watchSelectedProduct() {
    this.cashRegisterService.selectedProduct$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.product = value!
        this.productData = `${this.product.id!} - ${this.product.name} - R\$${this.product.price.toFixed(2)}`

        this.cashForm.get('product_id')!.patchValue(value?.id!)
        this.recalculateValue();
      })
  }

  private watchQuantity() {
    this.cashForm.get('quantity')!.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.recalculateValue())
  }
}
